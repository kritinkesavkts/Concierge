export enum DishCategory {
  STARTER = 'Starter',
  MAIN = 'Main Course',
  DESSERT = 'Dessert',
  DRINK = 'Beverage'
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  ingredients: string[];
  tags: string[]; // e.g., 'Spicy', 'Vegan', 'GF'
  calories?: number;
}

export interface Recommendation {
  dishId: string;
  reason: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[]; // If assistant suggests dishes
}

export interface MenuState {
  activeCategory: DishCategory | 'All';
  searchQuery: string;
  filteredDishes: Dish[];
}