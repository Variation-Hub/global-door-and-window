import { Router } from 'express';
import UploadController from '../utils/fileUpload';
import upload from '../middlewares/multer';

const fileRouter = Router();

fileRouter.post('/single', upload.single('file'), UploadController.uploadFile);
fileRouter.post('/multiple', upload.array('files', 10), UploadController.uploadMultipleFiles);

export default fileRouter;
