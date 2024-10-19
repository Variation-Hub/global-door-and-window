import { Router } from 'express';
import ImageController from '../controllers/imageController';

const imageRoute = Router();

imageRoute.get('/:fileName', ImageController.getImage);

export default imageRoute;
