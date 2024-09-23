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
                message: "Items fetch succesfully",
                status: true,
                data: items,
                meta_data: {
                    page,
                    items: totalCount,
                    page_size: limit,
                    pages: Math.ceil(totalCount / limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }

    public async showItemById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const item = await Item.findById(id);
            if (!item) {
                return res.status(404).json({
                    message: 'Item not found',
                    status: false
                });
            }
            res.status(200).json({
                message: "Item fetch successfully",
                status: true,
                data: item
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }

    public async showItemByType(req: any, res: Response) {
        try {
            const { page, limit, skip } = req.pagination!;
            const { category } = req.params;
            const { subCategory } = req.query

            let query: any = { category }

            if (subCategory) {
                query.subCategory = subCategory
            }
            const items = await Item.find(query).skip(skip).limit(limit)
            const totalCount = await Item.find(query).countDocuments();
            if (!items) {
                return res.status(404).json({
                    message: 'Item not found',
                    status: false
                });
            }
            res.status(200).json({
                message: "Items fetch succesfully",
                status: true,
                data: items,
                meta_data: {
                    page,
                    items: totalCount,
                    page_size: limit,
                    pages: Math.ceil(totalCount / limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
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
                return res.status(400).json({
                    message: 'Invalid category or type',
                    status: false
                });
            }

            const newItem = new Item({
                ...req.body
            });

            await newItem.save();
            res.status(201).json({
                message: "Item create successfully",
                status: true,
                data: newItem
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
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
                return res.status(400).json({
                    message: 'Invalid category or type',
                    status: false
                });
            }

            const updatedItem = await Item.findByIdAndUpdate(
                id,
                { ...req.body },
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).json({
                    message: 'Item not found',
                    status: false
                });
            }

            res.status(200).json({
                message: "Item update successfully",
                status: true,
                data: updatedItem
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }

    public async deleteItem(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const item = await Item.findByIdAndDelete(id);
            if (!item) {
                return res.status(404).json({
                    message: 'Item not found',
                    status: false
                });
            }

            item.images.forEach((image) => {
                const filePath = path.join(__dirname, '../uploads', image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });

            res.status(200).json({
                message: 'Item deleted successfully',
                status: true
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }
}

export default new ItemsController();
