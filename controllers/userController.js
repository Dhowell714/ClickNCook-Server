const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {

    let {email, password } = req.body.user;
    try{
   const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 12)
    });

    let token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

    res.status(201).json({
        message: "User successfully registered",
        user: newUser,
        sessionToken: token
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
5
    try {
    
        const loginUser = await User.findOne({
            where: {
                email: email
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password)

            if (passwordComparison) {

                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                res.status(200).json({
                    user: loginUser,
                    message: "user login success!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Wrong email or password"
                });
            }
        } else {
            res.status(401).json({
                message: "Wrong email or password"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to login",
        });
    }
});

module.exports = router;