import { FoodRepository } from "../repositories/food-repository";
import { Food } from "../models/food-model";

interface UpdtadeOptions { 
    name?: string;
    type?: string;
    price?: number;
    description?: string;
    imageUrl?: string;
}

// Atualiza um alimento
export class UpdateFoodService {
    private foodRepository: FoodRepository;

    constructor() {
        this.foodRepository = new FoodRepository();
    }

    public async exec(id: string, options: UpdtadeOptions): Promise<Food> {
        const food = await this.foodRepository.getById(id);

        if (!food) {
            throw new Error('Alimento não encontrado');
        }

        const updatedFood = await this.foodRepository.update(id, options);
        return updatedFood;
    } 
 }