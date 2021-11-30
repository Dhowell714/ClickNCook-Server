const express = require("express");
const router = express.Router();
const { Recipe } = require("../models");
// let validateJWT = require("../middleware/validate-jwt");

//create
router.post("/create", async (req, res) => {
    const { name, directions, cookTime, servingSize, category } = req.body.recipe;
    const { id } = req.user;
    const recipeEntry = {
        name,
        directions,
        cookTime,
        servingSize,
        category,
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
            message: "Failed to register Submission"});
    }
});



//edit
// router.put("/update/:recipeId", validateJWT, async (req, res) => {
router.put("/update/:recipeId", async (req, res) => {
    const { name, directions, cookTime, servingSize, category } = req.body.recipe;
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