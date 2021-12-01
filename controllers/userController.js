const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { User } = require("../models");

router.post("/register", async (req, res) => {

    let {email, password } = req.body.user;
    try{
   const newUser = await User.create({
        email,
        password
    });

    res.status(201).json({
        message: "User successfully registered",
        user: newUser
    });
} catch (err) {
    if (err instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use"
        });
    } else {
    res.status(500).json({
        message: "Failed to register user"
    });
    }
};
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    try {
        const loginUser = await User.findOne({
            where: {
                email: email
            
            }
        });

        if (loginUser) {
        res.status(200).json({
            user: loginUser,
            message: "User succesfully logged in."
        });
    } else {
        res.status(401).json({
            message: "Login failed"
        });
    }
    } catch (error) {
        res.status(500).json({
            message: "Failed to login user"
        })
    }
})

module.exports = router;