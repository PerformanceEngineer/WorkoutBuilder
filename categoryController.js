const cm = require("./model/category");
const CategoryModel = cm.Category;
const sequelize = cm.sequelize;

const createCategory = async (req, res) =>{
    try 
    {
        const existingCategory = await CategoryModel.findAll({where: 
        {
            title: req.body.title,
        },
        });
        if (existingCategory.length > 0) {
            return res.json({
                message: "Category already exists!",
        });
        }

        const newCategory = await CategoryModel.create({
            title: req.body.title
        });

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

const getCategory = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    await CategoryModel.findByPk( id )
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

module.exports = { createCategory, getCategory};