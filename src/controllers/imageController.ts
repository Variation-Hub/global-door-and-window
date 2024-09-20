import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

class ImageController {
    public async getImage(req: Request, res: Response): Promise<void> {
        try {
            const fileName = req.params.fileName;
            const filePath = path.join(__dirname, '../uploads', fileName);

            if (fs.existsSync(filePath)) {
                res.sendFile(filePath);
            } else {
                res.status(404).json({
                    message: 'Image not found',
                    status: false
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }
}

export default new ImageController();
