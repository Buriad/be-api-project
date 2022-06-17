const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CategoryController = require("../controller/CategoryController.js");
const UserController = require("../controller/UserController.js");
const FoodContoller = require("../controller/FoodController");
const AuthenticationController = require("../controller/AuthenticationController.js");
const aut = require("../middleware/aut");
//CATEGORIES
router.get("/category", CategoryController.getCategories);
router.post("/category", CategoryController.createCategories);
router.delete("/category", CategoryController.deleteCategories);
router.put("/category", CategoryController.updateCategories);

//USERS
router.get("/user", aut, UserController.getUser);
router.post("/user/create", aut, UserController.createUser);
router.delete("/user/delete", aut, UserController.deleteUser);
router.put("/user", aut, UserController.updateUser);
router.post("/user/register", AuthenticationController.register);
router.post("/user/login", AuthenticationController.login);
// FOOD MODEL
router.get("/food", FoodContoller.getFood);
router.post("/food", FoodContoller.createFood);
router.delete("/food", FoodContoller.deleteFood);
router.put("/food", FoodContoller.updateFood);

module.exports = router;