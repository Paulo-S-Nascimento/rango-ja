// import { FoodRepository } from "../repositories/food-repository";
// import { Food } from "../models/food-model";

// export class TypeFoodService {
//     private readonly foodRepository: FoodRepository;

//     constructor() {
//         this.foodRepository = new FoodRepository();
//     }
    
//     // Busca um alimento pelo tipo
//     public async exec(type: string): Promise<Food[]> {
//         const food = await this.foodRepository.getByType(type);

//         if (!food) {
//             throw new Error("Alimento não encontrado");
//         }

//         return food;
//     }
// }