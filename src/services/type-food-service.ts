import { FoodRepository } from '../repositories/food-repository';
import { Food } from "../models/food-model";


export class ListFoodByTypeService {
    private foodRepository = new FoodRepository();

    public async exec(type: string): Promise<Food[]> {
        return await this.foodRepository.findByType(type);
    }
}
