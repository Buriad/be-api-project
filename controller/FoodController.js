const foodModel = require("../models/foodModel.js");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const getFood = (req, res, next) => {
    foodModel.find({}, (err, data) => {
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

const createFood = (req, res, next) => {
    const id = req.query.id;
    let newFood = new foodModel({
        _id: new mongoose.Types.ObjectId(),
        category_id: req.body.category,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        portion: req.body.portion,
        ingredients: req.body.discount,
        status: req.body.status,
        sales: req.body.sales,
        image: req.body.image,
        thum_img: req.body.thum_img,
    });
    newFood
        .save()
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(next);
};

const deleteFood = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    food
        .findByIdAndDelete({ _id: id }, { new: true })
        .then((data) => {
            res.status(200).json({
                success: false,
                data: data,
            });
        })
        .catch(next);
};

const updateFood = (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    food
        .findOneAndUpdate({ _id: id }, body, {
            new: true,
        })
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch(next);
};

module.exports = { getFood, createFood, deleteFood, updateFood };