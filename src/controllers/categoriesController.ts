import { Request, Response } from 'express';
import Categories from '../models/categoriesModel';

class CategoriesController {

    // Create a new category
    public async createCategories(req: Request, res: Response) {
        try {
            const { name, subCategory, list } = req.body;
            const categories = await Categories.findOne({ name, subCategory });
            if (categories) {
                return res.status(409).json({
                    message: 'Categorie already exists',
                    status: false
                });
            }

            const newCategory = new Categories({
                name,
                subCategory,
                list
            });

            await newCategory.save();

            res.status(201).json({
                message: "Categorie created successfully",
                status: true,
                data: newCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    };

    // Fetch all categories
    public async fetchCategories(req: Request, res: Response) {
        try {
            const categories = await Categories.find();
            res.status(200).json({
                message: "Categories fetch successfully",
                status: true,
                data: categories
            });

        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    };

    // Fetch categories by subCategory
    public async fetchCategoriesBysubCategory(req: Request, res: Response) {
        try {
            const { name, subCategory } = req.params;
            const categories = await Categories.findOne({ name, subCategory });
            if (!categories) {
                return res.status(404).json({
                    message: 'No categories found for the given subCategory',
                    status: false
                });
            }

            res.status(200).json({
                message: "Categories fetch successfully",
                status: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    };

    // Update categories by subCategory
    public async updateCategoriesBysubCategory(req: Request, res: Response) {
        try {
            const { name, subCategory, list } = req.body;

            const updatedCategory = await Categories.findOneAndUpdate(
                { name, subCategory },
                { name, list },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({
                    message: 'No category found for the given subCategory',
                    status: false
                });
            }

            res.status(200).json({
                message: "Categorie updated successfully",
                status: true,
                data: updatedCategory
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    };

    // Delete categories by subCategory
    public async deleteCategoriesBysubCategory(req: Request, res: Response) {
        try {
            const { name, subCategory } = req.params;

            const deletedCategory = await Categories.findOneAndDelete({ name, subCategory });

            if (!deletedCategory) {
                return res.status(404).json({
                    message: 'No category found for the given subCategory',
                    status: false
                });
            }

            res.status(200).json({
                message: 'Category deleted successfully',
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    };
}

export default new CategoriesController();
