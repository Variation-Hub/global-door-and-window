import { Request, Response } from 'express';
import ContactModel from '../models/contactModel';

class ContactController {

    public async createContact(req: Request, res: Response) {
        try {
            const contactDetails = new ContactModel({
                ...req.body
            });

            await contactDetails.save();

            res.status(201).json(contactDetails);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };

    public async fetchContact(req: Request, res: Response) {
        try {
            const { page, limit, skip } = req.pagination!;
            const totalCount = await ContactModel.find().countDocuments();

            const contactDetails = await ContactModel.find().skip(skip).limit(limit);
            res.status(200).json({
                contactDetails, meta_data: {
                    page,
                    items: totalCount,
                    page_size: limit,
                    pages: Math.ceil(totalCount / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    };
}

export default new ContactController();
