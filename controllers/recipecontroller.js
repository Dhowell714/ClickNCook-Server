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



// //get spcific recipe
// router.get("/recipe/:id", validateJWT, async (req, res) => {
// // router.get("/recipe/ :id", async (req, res) => {
//     const { recipeId } = req.params.id;
//     const { ownerId } = req.user.id;

//     try {
//         const query = {
//             where: {
//                 id: recipeId,
//                 userId: ownerId,
//             },
//         };

//         const entries = await Recipe.find(query);
//         res.status(201).json({ entries });
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

//Get Recipe by name

router.get("/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const results = await Recipe.findAll({
            where: { name: name }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


// delete
router.delete("/delete/:id", validateJWT,  async (req, res) => {
// router.delete("/delete/:id", async (req, res) => {
    const recipeId = req.params.id;
    const ownerId = req.user.id;

    try {

        const query = {
            where: {
                id: recipeId,
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
    const recipeId = req.params.recipeId;
    const { id } = req.user;

    const query = {
        where: {
            id: recipeId,
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
=======
router.get('/practice', (req, res) => {
    
    res.status(200).json({ message: 'Hey! This  practice!'})
});
// 12
module.exports = router;

