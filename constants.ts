import { Dish, DishCategory } from './types';

export const MENU_ITEMS: Dish[] = [
  // Starters
  {
    id: 's1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls infused with black truffle, served with garlic aioli.',
    price: 12,
    category: DishCategory.STARTER,
    ingredients: ['Risotto Rice', 'Black Truffle', 'Parmesan', 'Breadcrumbs', 'Garlic', 'Egg'],
    tags: ['Vegetarian', 'Crispy'],
    calories: 450
  },
  {
    id: 's2',
    name: 'Spicy Tuna Tartare',
    description: 'Fresh yellowfin tuna with avocado, soy-ginger dressing, and chili oil.',
    price: 16,
    category: DishCategory.STARTER,
    ingredients: ['Tuna', 'Avocado', 'Soy Sauce', 'Ginger', 'Chili Oil', 'Sesame Seeds'],
    tags: ['Spicy', 'Raw', 'Seafood', 'GF'],
    calories: 320
  },
  {
    id: 's3',
    name: 'Burrata & Heirloom Tomato',
    description: 'Creamy burrata cheese served with fresh basil pesto and balsamic glaze.',
    price: 15,
    category: DishCategory.STARTER,
    ingredients: ['Burrata', 'Heirloom Tomatoes', 'Basil', 'Pine Nuts', 'Olive Oil', 'Balsamic Vinegar'],
    tags: ['Vegetarian', 'Fresh', 'GF'],
    calories: 400
  },
  
  // Mains
  {
    id: 'm1',
    name: 'Pan-Seared Scallops',
    description: 'Jumbo scallops with cauliflower purée, crispy pancetta, and lemon butter sauce.',
    price: 28,
    category: DishCategory.MAIN,
    ingredients: ['Scallops', 'Cauliflower', 'Pancetta', 'Butter', 'Lemon', 'Parsley'],
    tags: ['Seafood', 'Elegant', 'GF'],
    calories: 550
  },
  {
    id: 'm2',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice slowly cooked with porcini mushrooms, finished with truffle oil.',
    price: 22,
    category: DishCategory.MAIN,
    ingredients: ['Arborio Rice', 'Porcini Mushrooms', 'White Wine', 'Parmesan', 'Truffle Oil', 'Butter'],
    tags: ['Vegetarian', 'Comfort', 'GF'],
    calories: 650
  },
  {
    id: 'm3',
    name: 'Herb-Crusted Lamb Rack',
    description: 'Roasted rack of lamb with rosemary jus, fondant potatoes, and seasonal greens.',
    price: 34,
    category: DishCategory.MAIN,
    ingredients: ['Lamb Rack', 'Rosemary', 'Thyme', 'Breadcrumbs', 'Potatoes', 'Broccolini'],
    tags: ['Meat', 'Hearty'],
    calories: 850
  },
  {
    id: 'm4',
    name: 'Miso Glazed Eggplant',
    description: 'Roasted eggplant glazed with sweet miso, topped with sesame and scallions.',
    price: 19,
    category: DishCategory.MAIN,
    ingredients: ['Eggplant', 'Miso Paste', 'Mirin', 'Sugar', 'Sesame Seeds', 'Scallions'],
    tags: ['Vegan', 'Asian-Fusion', 'Sweet & Savory'],
    calories: 380
  },
  {
    id: 'm5',
    name: 'Classic Beef Burger',
    description: 'Wagyu beef patty, aged cheddar, caramelized onions, and house sauce on brioche.',
    price: 20,
    category: DishCategory.MAIN,
    ingredients: ['Wagyu Beef', 'Cheddar Cheese', 'Onions', 'Brioche Bun', 'Lettuce', 'Tomato'],
    tags: ['Meat', 'Comfort'],
    calories: 950
  },

  // Desserts
  {
    id: 'd1',
    name: 'Dark Chocolate Fondant',
    description: 'Warm molten chocolate cake served with vanilla bean ice cream.',
    price: 12,
    category: DishCategory.DESSERT,
    ingredients: ['Dark Chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla Ice Cream'],
    tags: ['Sweet', 'Indulgent', 'Vegetarian'],
    calories: 500
  },
  {
    id: 'd2',
    name: 'Lemon Basil Tart',
    description: 'Zesty lemon curd in a buttery crust, topped with italian meringue and basil.',
    price: 10,
    category: DishCategory.DESSERT,
    ingredients: ['Lemon', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Basil'],
    tags: ['Tart', 'Citrus', 'Vegetarian'],
    calories: 350
  },

  // Drinks
  {
    id: 'b1',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, maple syrup, bitters, smoked with oak chips.',
    price: 14,
    category: DishCategory.DRINK,
    ingredients: ['Bourbon', 'Maple Syrup', 'Angostura Bitters', 'Orange Peel'],
    tags: ['Alcoholic', 'Strong', 'Smoky'],
    calories: 150
  },
  {
    id: 'b2',
    name: 'Cucumber Mint Cooler',
    description: 'Refreshing mocktail with cucumber juice, mint, lime, and soda water.',
    price: 8,
    category: DishCategory.DRINK,
    ingredients: ['Cucumber', 'Mint', 'Lime', 'Soda Water', 'Agave'],
    tags: ['Non-Alcoholic', 'Refreshing', 'Vegan'],
    calories: 60
  }
];

export const SYSTEM_INSTRUCTION = `
You are an expert culinary concierge for a high-end restaurant called "CraveCompass".
Your goal is to help customers choose the perfect dish based on their current mood, taste preferences, or dietary restrictions.

DATA:
You will be provided with the restaurant's current menu in JSON format.

RULES:
1. Only recommend dishes that are explicitly on the provided menu.
2. If a user asks for something not on the menu (e.g., Pizza), politely explain it's not available and suggest the closest alternative (e.g., Arancini for something cheesy/bready).
3. If the user mentions ingredients they dislike or are allergic to, FILTER those dishes out completely.
4. Be brief, charming, and appetizing in your descriptions.
5. ALWAYS output your response in valid JSON format matching the schema provided.
`;