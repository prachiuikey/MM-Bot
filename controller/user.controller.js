const db = require("../models");
const User = db.user;
const userServices = require("../service/user.service");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");

const signUp = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    if (user) {
        res.send({ user });
        return;
    }
    res.status(httpStatus.CONFLICT).send({
        "message": "User already exists",
    })
});

const getUserById = catchAsync(async (req, res) => {
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
        res.send({
            "message": "User not found",
        })
        return;
    }
    res.send({ user });
});
const updateUser = catchAsync(async (req, res) => {
    const row = await userServices.updateUserById(req.params.id, req.body);
    if (!row) {
        res.send({
            "message": "User not found",
        })
        return;
    }

    res.send({
        message: `User updated for Id ${req.params.id} successfully!`
    });
});

const updateSetting = catchAsync(async (req, res) => {
    const row = await userServices.updateSetting(req.params.id, req.body);
    if (!row) {
        res.send({
            "message": "User Setting not found",
        })
        return;
    }

    res.send({
        message: `Setting updated for Id ${req.params.id} successfully!`
    });
});

const getUserSetting = catchAsync(async (req, res) => {
    const setting = await userServices.getUserSetting(req.params.id);
    if (!setting) {
        res.send({
            "message": "User Setting not found",
        })
        return;
    }

    res.send(setting);
});
const deleteUser = catchAsync(async (req, res) => {
    const deleted = await userServices.deleteUserById(req.params.id);
    if (!deleted) {
        res.send({
            "message": "User not found",
        })
    }
    res.status(httpStatus.OK).send({
        message: "User successfully deleted!"
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const user = await userServices.getUserByNameAndRole(req.query);
    let users = null;
    if(user)
    {
        users = await userServices.getAllUsers();
    }
     
    res.send({ users });
});


module.exports = {
    signUp,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    updateSetting,
    getUserSetting
}