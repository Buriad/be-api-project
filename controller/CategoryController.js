const category = require("../models/category.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const getCategories = (req, res, next) => {
    category.find({}, function (err, data) {
        if (err) {
            throw err;
        } else {
            return res.json({
                success: true,
                data: data,
            });
        }
    });
};
const createCategories = (req, res, next) => {
    let newCategory = new category({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        color: req.body.color,
    });
    newCategory
        .save()
        .then((data) => {
            res.status(201).json({
                message: "Handling POST requests to /category",
                data: data,
            });
        })
        .catch(next);
};

const deleteCategories = (req, res, next) => {
    const iD = req.params.id;
    category
        .findByIdAndDelete({ _id: iD })
        .then((data) => {
            res.status(200).json({
                message: "Deleted successfully",
                data: data,
            });
        })
        .catch(next);
};
const updateCategories = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    category
        .findByIdAndUpdate({ _id: id }, body, { new: true })
        .then((data) => {
            res.status(200).json({
                message: "Successfully updated",
                data: data,
            });
        })
        .catch(next);
};
module.exports = {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories,
};