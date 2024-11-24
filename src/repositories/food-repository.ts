import { Food } from '../models/food-model';

// Firebase
import { db } from '../firebase.config'; 
import { ref, push, get, child, remove, update } from 'firebase/database';


export class FoodRepository {
    private foodRef = ref(db, 'foods');

    // Cria um novo alimento
    public async create(name: string, type: string, price: number, description?: string, imageUrl?: string): Promise<Food> {
        const newFood: Omit<Food, 'id'> = { 
            name,
            type,
            price,
            description: description || '', 
            imageUrl: imageUrl || '', 
        };
    
        try {
            const foodRef = await push(this.foodRef, newFood);
            return {
                ...newFood,
                id: foodRef.key || '', 
            };
        } catch (error) {
            console.error('Erro ao salvar no banco de dados:', error);
            throw new Error('Erro ao salvar no banco de dados');
        }
    };
    
    // Lista todos os alimentos
    public async listAll(): Promise<Food[]> {
        try {
            const snapshot = await get(this.foodRef);
            if (snapshot.exists()) {
                const data: Food[] = [];
                snapshot.forEach((childSnapshot) => {
                    const food = childSnapshot.val();
                    food.id = childSnapshot.key || '';
                    data.push(food);
                });
                return data;
            }
            return [];
        } catch (error) {
            console.error('Erro ao listar alimentos:', error);
            throw new Error('Erro ao listar alimentos');
        }
    };
    
    // Busca um alimento pelo ID
    public async getById(id: string): Promise<Food | null> {
        try {
            const foodItemRef = child(this.foodRef, id);
            const snapshot = await get(foodItemRef);
    
            if (snapshot.exists()) {
                return {
                    ...snapshot.val(),
                    id: snapshot.key || ''
                } as Food;
            } else {
                return null;
            }
    
        } catch (error) {
            console.error('Erro ao buscar o alimento pelo ID:', error);
            throw new Error('Erro ao buscar o alimento pelo ID');
        }
    };
    // Deleta um alimento
    public async delete(id: string): Promise<void> {
        try {
            const foodItemRef = child(this.foodRef, id);
            await remove(foodItemRef);

            console.log(`Alimento com ID ${id} removido com sucesso.`);
            
        } catch (error) {
            console.error('Erro ao deletar o alimento:', error);
            throw new Error('Erro ao deletar o alimento');
         }
    };

    // Atualiza um alimento
    public async update(id: string, options: Partial<Food>): Promise<Food> {
        const foodItemRef = child(this.foodRef, id);
    
       
        const updatedFields = Object.fromEntries(
            Object.entries(options).filter(([_, value]) => value !== undefined)
        );
    
        await update(foodItemRef, updatedFields);
        return { ...options, id } as Food;
    }

    // Lista alimentos por tipo
    public async findByType(type: string): Promise<Food[]> { 
    try { 
        const snapshot = await get(this.foodRef); 
       
    if (snapshot.exists()) { 
      const data: Food[] = []; 

    snapshot.forEach((childSnapshot) => { 
    const food = childSnapshot.val(); 

      if (food.type === type) {''; data.push(food); } }); 
      return data; 
    } 

      return []; 
    } 
      catch (error) { 
      console.error('Erro ao listar alimentos por tipo:', error); 
      throw new Error('Erro ao listar alimentos por tipo'); 
    }
     }
   }

