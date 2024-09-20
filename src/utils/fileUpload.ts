// src/controllers/uploadController.ts
import { Request, Response } from 'express';

class UploadController {
    public async uploadFile(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({
                    message: 'No file uploaded',
                    status: false
                });
                return;
            }

            const filePath = `/${req.file.filename}`;
            res.status(200).json({
                message: 'File uploaded successfully',
                status: true,
                data: filePath
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server error',
                status: false,
                error
            });
        }
    }

    public async uploadMultipleFiles(req: Request, res: Response): Promise<void> {
        try {
            if (!req.files || !Array.isArray(req.files)) {
                res.status(400).json({
                    message: 'No files uploaded',
                    status: false
                });
                return;
            }

            const filePaths = req.files.map((file: Express.Multer.File) => `/${file.filename}`);
            res.status(200).json({
                message: 'Files uploaded successfully',
                status: true,
                data: filePaths
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

export default new UploadController();
