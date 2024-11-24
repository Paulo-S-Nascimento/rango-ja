import { Food } from '../models/food-model';
import { FoodRepository } from '../repositories/food-repository';

export class CreateFoodService {
    private foodRepository: FoodRepository

    constructor() {
        this.foodRepository = new FoodRepository()
    };

    public async exec(name: string, type: string, price: number, description?: string, imageUrl?: string): Promise<Food> {
        this.validate(name, type, price);
    
        // Cria um alimento com nome, tipo, preço e imagem (caso fornecida)
        let food = await this.foodRepository.create(name, type, price, description, imageUrl);
        
        return food
    };


    // Valida se os campos estão preenchidos, a imagem é opcional
     private validate(name: string, type: string, price: number): void {
        if (!name) throw new Error('Insira um nome');
        if (!type) throw new Error('Insira um tipo');
        if (!price) throw new Error('Insira um preço')
    };

}


