const Category = require("./model/category").Category;
const em = require("./model/exercise");
const ExerciseModel = em.Exercise;
const sequelize = em.sequelize;



const createExercise = async (req, res) =>{
    try 
    {
        const existingExercise = await ExerciseModel.findAll({where: 
        {
            name: req.body.name,
        },
        });
        if (existingExercise.length > 0) {
            return res.json({
                message: "Exercise already exists!",
        });
        }

        const cat = await Category.findAll({
            where: {
                title: req.body.categoryTitles,
            },
        });

        const newExercise = await ExerciseModel.create({
            name: req.body.name,
            description: req.body.description,
            videoUrl: req.body.videoUrl,
        });

        const existingAssociations = await newExercise.getCategories();

        await newExercise.setCategories(cat);

        return res.json(
        {
            message: "Record created successfully!",
        });

    }
    catch(error) 
    {
        console.log(error);
        return res.json(
        {
              message: "Unable to create a record!",
        });
    }

 };

const getExercise = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    await ExerciseModel.findByPk( id )
    .then((result) => {
        return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    });
};

// const getExercisesByCategory = async (req, res) => {
//     const cat = req.query.category;
//     console.log(cat);
//     var cats = await Category.findOne({
//         where: {
//             title: cat,
//         },
//     })
//     .catch((error) => {
//         console.log(error);
//         return res.json({
//             message: 'Unable to fetch the record!'
//         });
//     });
    
//     await ExerciseModel.findAll({
//         where: {
//             exerciseCategoryId: cats.id,
//         },
//     })
//     .then((result) => {
//         return res.json(result);
//     })
//     .catch((error) => {
//         console.log(error);
//         return res.json({
//             message: 'Unable to fetch the record!'
//         });
//     });

const getExercisesByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category title is required!" });
        }

        const categoryRecord = await Category.findOne({ where: { title: category },
            include: {
                model: ExerciseModel,
                through: { attributes: [] }, // Exclude join table fields
            },
        });

        if (!categoryRecord) {
            return res.status(404).json({ message: "Category not found!" });
        }

        const exercises = categoryRecord.Exercises; // Use Sequelize association helper

        return res.status(200).json(exercises);

    } catch (error) {
        console.error("Error in getExercisesByCategory:", error);
        return res.status(500).json({ message: "Unable to fetch the record!" });
    }
};

//}


module.exports = { createExercise, getExercise, getExercisesByCategory };