import { Router } from 'express'
import { FoodController } from '../controllers/food-controller'
import { upload } from '../middlewares/upload';

const routes = Router()
const foodController = new FoodController();


routes.get('/food', foodController.listAll);
routes.delete('/food/:id', foodController.delete);
routes.put('/food/:id', foodController.update);
routes.get('/food/:id', foodController.detail);
routes.post('/food', upload.single('image'), foodController.create.bind(foodController));
routes.post('/upload-image', upload.single('image'), foodController.uploadImage.bind(foodController));


export { routes };
