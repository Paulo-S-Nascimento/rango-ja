import { Router } from 'express'
import { FoodController } from '../controllers/food-controller'

const routes = Router()
const foodController = new FoodController();


routes.post('/food', foodController.create);
routes.get('/food', foodController.listAll);
routes.delete('/food/:id', foodController.delete);
routes.put('/food/:id', foodController.update);
routes.get('/food/:id', foodController.detail);


export { routes };
