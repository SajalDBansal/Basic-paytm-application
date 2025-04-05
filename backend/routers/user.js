const express = require("express");
const router = express.Router();

const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db")
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Delete the database (for development stage only)
// const initializeData = require("../init");
// initializeData();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})



router.post("/signup", async (req, res) => {
    const data = req.body;
    const result = signupBody.safeParse(data);

    if (!result.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    };

    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
    });

    await Account.create({
        userId: user.id,
        balance: Math.floor(Math.random() * 10000) + 1
    });

    const userId = user._id;
    const jwtToken = jwt.sign({ userId }, JWT_SECRET);
    res.json({
        message: "User created successfully",
        token: jwtToken,
    })

})

router.post("/signin", async (req, res) => {
    const data = req.body;

    const result = signinBody.safeParse(data);

    if (!result.success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    };

    const user = await User.findOne({
        username: data.username,
        password: data.password
    })

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
})

router.put("/", authMiddleware, async (req, res) => {
    const data = req.body;
    const result = updateBody.safeParse(data);
    if (!result.success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.findByIdAndUpdate(req.userId, data);

    res.json({
        message: "Updated successfully"
    })



})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    const userWithOutSelf = users.filter((user) => user._id != req.userId);

    res.json({
        user: userWithOutSelf.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
})

module.exports = router;