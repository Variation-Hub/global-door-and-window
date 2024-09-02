import * as express from 'express';
import userRoutes from './authRoute';
import categoriesRoute from './categoriesRoute';
import contactRoute from './contactRoute';
import fileUploadRouter from "./fileUploads";
import productRoute from "./productRoute";
import imageRoute from './imageRoute';

const Routes = express.Router();

Routes.use("/auth", userRoutes);
Routes.use("/categories", categoriesRoute);
Routes.use("/contact", contactRoute);
Routes.use("/file", fileUploadRouter);
Routes.use("/product", productRoute);
Routes.use('/images', imageRoute);


export default Routes; 
