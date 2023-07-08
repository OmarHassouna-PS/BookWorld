const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const errorHandler = require("../middleware/500");

const allUsers = (req, res) => {
    User.find()
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: id });
    res.json(user);
};

const newUser = async (req, res, next) => {

    const { username, email, password, phone } = req.body;
    console.log(username, email, password)
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(401).send("Email already taken");
        }
    } catch (error) {
        errorHandler(error, req, res);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
        username: username,
        email: email,
        password: hashedPwd,
        favoritesList : [],
        phone: phone
    });

    const user = await newUser.save();

    req.user = user;
    next();
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.user;

    const userData = await User.findById(userId);

    if (!updatedUserData) {
        return res.status(401).send('User not found');
    }

    if (!(await bcrypt.compare(userData.password, updatedUserData.password))) {

        return res.status(401).send("incorrect password");
    }

    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
    const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    const updatedUser = await user.save();
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(204).json(User);
};

module.exports = {
    allUsers,
    newUser,
    oneUser,
    updateUser,
    deleteUser,
}; 