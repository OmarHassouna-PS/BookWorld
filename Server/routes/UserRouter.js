const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");


router.get("/user", userController.allUsers);
router.post("/user", userController.newUser, authController.createToken);
router.get("/user/:id", userController.oneUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;