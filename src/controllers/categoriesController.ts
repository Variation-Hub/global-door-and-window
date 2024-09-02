import { Request, Response } from 'express';
import Categories from '../models/categoriesModel';

class CategoriesController {

    // Create a new category
    public async createCategories(req: Request, res: Response) {
        try {
            const { name, subCategory, list } = req.body;
            const categories = await Categories.findOne({ name, subCategory });
            if(categories){
                return res.status(409).json({ message: 'Category already exists' });
            }

            const newCategory = new Categories({
                name,
                subCategory,
                list
            });

            await newCategory.save();

            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };

    // Fetch all categories
    public async fetchCategories(req: Request, res: Response) {
        try {
            const categories = await Categories.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };

    // Fetch categories by subCategory
    public async fetchCategoriesBysubCategory(req: Request, res: Response) {
        try {
            const { name, subCategory } = req.params;
            const categories = await Categories.findOne({ name, subCategory });
            if (!categories) {
                return res.status(404).json({ message: 'No categories found for the given subCategory' });
            }

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
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
                return res.status(404).json({ message: 'No category found for the given subCategory' });
            }

            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };

    // Delete categories by subCategory
    public async deleteCategoriesBysubCategory(req: Request, res: Response) {
        try {
            const { name, subCategory } = req.params;

            const deletedCategory = await Categories.findOneAndDelete({ name, subCategory });

            if (!deletedCategory) {
                return res.status(404).json({ message: 'No category found for the given subCategory' });
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };
}

export default new CategoriesController();
