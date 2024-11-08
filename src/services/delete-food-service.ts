import { FoodRepository } from "../repositories/food-repository";
import { Food } from "../models/food-model";

export class DeleteFoodService {
    private readonly foodRepository: FoodRepository;

    constructor() {
        this.foodRepository = new FoodRepository();
    }

    // Deleta um alimento pelo id
    public async exec(id: string): Promise<void> {
        const existingFood = await this.foodRepository.getById(id);

        if (!existingFood) {
            throw new Error('Alimento não encontrado');
        }

        await this.foodRepository.delete(id);
    };
}