const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/login", authController.loginUser, authController.createToken);
router.get("/Verify_token", verifyJWT);


module.exports = router;