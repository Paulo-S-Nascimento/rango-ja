import { Request, Response } from 'express';


import { CreateFoodService } from '../services/create-food-service';
import { DeleteFoodService } from '../services/delete-food-service';
import { ListFoodService } from '../services/list-food-service';
import { UpdateFoodService } from '../services/update-food-service';
import { DetailFoodService } from '../services/detail-food-service';
import { UploadFoodImageService } from '../services/upload-food-image-service';

export class FoodController { 

    // POST /food
    // Cria um novo alimento
    public async create(req: Request, res: Response): Promise<void> {
      try {
          const { name, type, price, description } = req.body;
          const file = req.file; 
          let imageUrl: string | undefined;

        
          if (file) {
              const uploadService = new UploadFoodImageService();
              const fileName = `food_${Date.now()}_${file.originalname}`; 
              imageUrl = await uploadService.exec(file.buffer, fileName);
          }

          const createFoodService = new CreateFoodService();
          const food = await createFoodService.exec(name, type, price, description, imageUrl);

          res.status(201).json(food);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Erro ao criar alimento' });
      }
    };

    // GET /food
    // Lista todos os alimentos
    public async listAll(req: Request, res: Response): Promise<void> {
        try {
          const listFoodService = new ListFoodService();
          const food = await listFoodService.exec();
          res.status(200).json(food);
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
          res.status(204).send({'message': 'Alimento Deletado'});
        } catch (error) {
          res.status(500).json({ error: 'Erro ao deletar alimento' });
        }
      };

    // PUT /food/:id
    // Atualiza um alimento
    public async update(req: Request, res: Response): Promise<void> {
        try {
          const { id } = req.params;
          const { name, type, price, description, imageUrl } = req.body;
          const updateFoodService = new UpdateFoodService();
          const food = await updateFoodService.exec(id, { name, type, price, description, imageUrl});
          res.status(200).json(food);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar alimento' });
        }
      };

    // GET /food/:id
    // Busca um alimento por ID
    public async detail (req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const detailFoodService = new DetailFoodService();
        const food = await detailFoodService.exec(String(id));
        (res as Response).status(200).json(food);
      } catch (error) {
        (res as Response).status(404).json({ "error": "Alimento não encontrado" });
      }
    }    

    // POST /upload-image
    public async uploadImage(req: Request, res: Response): Promise<void> {
      try {
          const file = req.file; 
          
          if (!file) {
              res.status(400).json({ error: 'Por favor, insira uma imagem.' });
              return;
          }

          const uploadService = new UploadFoodImageService();
          const fileName = `food_${Date.now()}_${file.originalname}`; 
          const imageUrl = await uploadService.exec(file.buffer, fileName);

          res.status(201).json({ imageUrl });
      } catch (error: any) {
          console.error(error);
          res.status(500).json({ error: error.message || 'Erro ao fazer upload da imagem.' });
      }
  }
}

