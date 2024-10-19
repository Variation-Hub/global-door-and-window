import express from 'express';
import categoriesController from "../controllers/categoriesController";

const categories = express.Router();

categories.post('/create', categoriesController.createCategories);
categories.get('/list', categoriesController.fetchCategories)
categories.get('/list/:name/:subCategory', categoriesController.fetchCategoriesBysubCategory)
categories.put('/update', categoriesController.updateCategoriesBysubCategory);
categories.delete('/delete/:name/:subCategory', categoriesController.deleteCategoriesBysubCategory);



export default categories;
