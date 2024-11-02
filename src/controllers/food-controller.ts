import { Request, Response } from 'express';
import { CreateFoodService } from '../services/create-food-service';
import { DeleteFoodService } from '../services/delete-food-service';
import { ListFoodService } from '../services/list-food-service';

export class FoodController { 

    // POST /food
    // Cria um novo alimento
    public async create(req: Request, res: Response): Promise<void> {
        try {
          const { name, type, price, imageUrl } = req.body;

          const createFoodService = new CreateFoodService();
          const food = await createFoodService.exec(name, type, price, imageUrl);

          res.status(201).json(food);

        } catch (error) {

          res.status(500).json({ error: 'Erro ao criar alimento' })
        };
      };

    // GET /food
    // Lista todos os alimentos
    public async listAll(req: Request, res: Response): Promise<void> {
        try {
          const listFoodService = new ListFoodService();
          const foods = await listFoodService.exec();
          res.status(200).json(foods);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao listar alimentos' });
        }
      };   
      
    // DELETE /food/:id
    // Deleta um alimento
    public async delete(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          const deleteFoodService = new DeleteFoodService();
          await deleteFoodService.exec(id);
          res.status(204).send({'message': 'Alimento deletado com sucesso'});
        } catch (error) {
          res.status(500).json({ error: 'Erro ao deletar alimento' });
        }
      };
 }


 