import { Food } from "../models/food-model";
import { FoodRepository } from "../repositories/food-repository";

export class ListFoodService { 
    private foodRepository: FoodRepository;

    constructor() {
        this.foodRepository = new FoodRepository();
    }

    // Lista todos os alimentos
    public async exec(): Promise<Food[]> {
        const foods = await this.foodRepository.listAll();
        return foods
    };

    }
