import { Router } from 'express';
import ItemsController from '../controllers/productController';
import { paginationMiddleware } from '../middlewares/pagination';

const productRoute = Router();

productRoute.get('/list', paginationMiddleware, ItemsController.showItems);
productRoute.get('/list/:id', ItemsController.showItemById);
productRoute.get('/list-filter/:category', ItemsController.showItemByType)
productRoute.post('/create', ItemsController.createItem);
productRoute.put('/update/:id', ItemsController.updateItem);
productRoute.delete('/delete/:id', ItemsController.deleteItem);

export default productRoute;
