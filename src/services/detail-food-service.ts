import { FoodRepository } from "../repositories/food-repository";
import { Food } from "../models/food-model";

export class DetailFoodService {
    private readonly foodRepository: FoodRepository;

    constructor() {
        this.foodRepository = new FoodRepository();
    }

    // Busca um alimento pelo id
    public async exec(id: string): Promise<Food | null> {
        const food = await this.foodRepository.getById(id);

        if (!food) {
            throw new Error("Alimento não encontrado");
        }

        return food;
    }
}
