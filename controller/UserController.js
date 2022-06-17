const users = require("../models/users.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const getUser = (req, res, next) => {
    users.find({}, (err, data) => {
        if (err) {
            throw err;
        } else {
            return res.json({
                status: true,
                data: data,
            });
        }
    });
};

const createUser = (req, res, next) => {
    let newUser = new users({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role_id: req.body.role_id,
        created_date: req.body.created_date,
        last_activity: req.body.last_activity,
    });
    newUser
        .save()
        .then((data) => [
            res.status(200).json({
                success: true,
                data: data,
            }),
        ])
        .catch(next);
};

const deleteUser = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    users
        .findByIdAndDelete({ _id: id }, { new: true })
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(next);
};

const updateUser = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    users
        .findOneAndUpdate({ _id: id }, body, {
            new: true,
        })
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch((err) => {
            res.status(400).json({
                success: false,
                data: err,
            });
        });
};

module.exports = { getUser, createUser, deleteUser, updateUser };