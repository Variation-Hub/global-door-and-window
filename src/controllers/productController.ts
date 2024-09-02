import { Request, Response } from 'express';
import Item from '../models/productModel';
import Categories from '../models/categoriesModel';

import path from 'path';
import fs from 'fs';

class ItemsController {

    public async showItems(req: Request, res: Response) {
        try {
            const { page, limit, skip } = req.pagination!;
            const totalCount = await Item.find().countDocuments();

            const items = await Item.find().skip(skip).limit(limit);
            res.status(200).json({
                items, meta_data: {
                    page,
                    items: totalCount,
                    page_size: limit,
                    pages: Math.ceil(totalCount / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async showItemById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async showItemByType(req: any, res: Response) {
        try {
            const { category, subCategory } = req.params;

            const item = await Item.find({ category, subCategory})
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async createItem(req: Request, res: Response) {
        try {

            const { category, subCategory, type } = req.body;

            const validCategory = await Categories.findOne({
                name: category,
                subCategory,
                list: { $in: type }
            });

            if (!validCategory) {
                return res.status(400).json({ message: 'Invalid category or type' });
            }

            const newItem = new Item({
                ...req.body
            });

            await newItem.save();
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async updateItem(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { category, subCategory, type } = req.body;

            const validCategory = await Categories.findOne({
                name: category,
                subCategory,
                list: { $in: type }
            });

            if (!validCategory) {
                return res.status(400).json({ message: 'Invalid category or type' });
            }

            const updatedItem = await Item.findByIdAndUpdate(
                id,
                { ...req.body },
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).json({ message: 'Item not found' });
            }

            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    public async deleteItem(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const item = await Item.findByIdAndDelete(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            item.images.forEach((image) => {
                const filePath = path.join(__dirname, '../uploads', image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });

            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default new ItemsController();
