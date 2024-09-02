import express from 'express';
import contactController from "../controllers/contactController";
import { paginationMiddleware } from '../middlewares/pagination';

const contact = express.Router();

contact.post('/create', contactController.createContact);
contact.get('/list', paginationMiddleware, contactController.fetchContact);

export default contact;
