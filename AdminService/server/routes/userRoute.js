const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const userService = require("../services/userService");



router.post("/addcustomer", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const message = await userService.addUser(name, email, password);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get("/getcurrentuser/:id", async (req, res) => {
    let userId = req.params.id;
    try {
        const currentUser = await userService.getCurrentUser(userId);
        res.send(currentUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/update/password/:id", async (req, res) => {
    let userId = req.params.id;
    const { newPassword } = req.body;
    try {
        const message = await userService.updateUserPassword(userId, newPassword);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put("/update/name/:id", async (req, res) => {

    let userId = req.params.id;
    const { name } = req.body;

    const updateUserName = {

        name,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserName)
        res.send('User Name Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/name/:id", async (req, res) => {
    let userId = req.params.id;
    const { newName } = req.body;
    try {
        const message = await userService.updateUserName(userId, newName);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/update/email/:id", async (req, res) => {
    let userId = req.params.id;
    const { newEmail } = req.body;
    try {
        const message = await userService.updateUserEmail(userId, newEmail);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/delete/customer/:id", async (req, res) => {
    let userId = req.params.id;
    try {
        const message = await userService.deleteUser(userId);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//customer management update function

router.put("/update/customer/name/:id", async (req, res) => {
    let userId = req.params.id;
    const { name } = req.body;
    try {
        const message = await userService.updateUserName(userId, name);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put("/update/customer/email/:id", async (req, res) => {
    let userId = req.params.id;
    const { email } = req.body;
    try {
        const message = await userService.updateUserEmail(userId, email);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/update/customer/password/:id", async (req, res) => {
    let userId = req.params.id;
    const { password } = req.body;
    try {
        const message = await userService.updateUserPassword(userId, password);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put("/update/customer/verification/:id", async (req, res) => {
    let userId = req.params.id;
    const { isVerified } = req.body;
    try {
        const message = await userService.updateUserVerification(userId, isVerified);
        res.send(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;