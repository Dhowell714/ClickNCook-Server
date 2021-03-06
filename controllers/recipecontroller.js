const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
let {Recipe} = require("../models");


//create
router.post("/create", validateJWT, async (req, res) => {
    const { name, directions, cookTime, servingSize, category, ingredients, substitutions } = req.body.recipe;
    const { id } = req.user;
    const recipeEntry = {
        name,
        directions,
        cookTime,
        servingSize,
        category,
        ingredients,
        substitutions,
        userId: id
    };
    try {
        
        const newRecipe = await Recipe.create(recipeEntry);
        res.status(201).json({
            message: "Item successfully created",
            name: newRecipe,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to register submission"});
    }
});


//get all recipes
router.get("/all", validateJWT, async (req, res) => {
    try {
        const entries = await Recipe.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userRecipes = await Recipe.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userRecipes);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const results = await Recipe.findAll({
            where: { name: name }
        });5
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const results = await Recipe.findAll({
            where: { category: category }
        });5
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
        
    }
});

// delete
router.delete("/delete/:name", validateJWT,  async (req, res) => {
// router.delete("/delete/:id", async (req, res) => {
    const {name} = req.params;
    const ownerId = req.user.id;

    try {

        const query = {
            where: {
                name: name,
                userId: ownerId,
            },
        };

        await Recipe.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



//edit
router.put("/update/:recipeId", validateJWT, async (req, res) => {
// router.put("/update/:recipeId", async (req, res) => {
    const { name, directions, cookTime, servingSize, category, ingredients, substitutions } = req.body.recipe;
    //const name = req.params
    const recipeId = req.params.recipeId
    const { id } = req.user;

    const query = {
        where: {
            id: recipeId,
            //name: name,
            userId: id
        },
    };

    const newNewRecipe = {
        name: name,
        directions: directions,
        cookTime: cookTime,
        servingSize: servingSize,
        category: category,
        ingredients: ingredients,
        substitutions: substitutions,
        userId: id
    };

    try {
        const updatedRecipe = await Recipe.update(newNewRecipe, query);
        res.status(200).json({updatedRecipe, message: "Item has been updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



module.exports = router; 