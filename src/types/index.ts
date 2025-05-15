import { Database } from './supabase';

// Client types
export type Client = Database['public']['Tables']['clients']['Row'];
export type NewClient = Database['public']['Tables']['clients']['Insert'];
export type UpdateClient = Database['public']['Tables']['clients']['Update'];

// Ingredient types
export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type NewIngredient = Database['public']['Tables']['ingredients']['Insert'];
export type UpdateIngredient = Database['public']['Tables']['ingredients']['Update'];

// Recipe types
export type Recipe = Database['public']['Tables']['recipes']['Row'];
export type NewRecipe = Database['public']['Tables']['recipes']['Insert'];
export type UpdateRecipe = Database['public']['Tables']['recipes']['Update'];

// RecipeIngredient types
export type RecipeIngredient = Database['public']['Tables']['recipe_ingredients']['Row'];
export type NewRecipeIngredient = Database['public']['Tables']['recipe_ingredients']['Insert'];
export type UpdateRecipeIngredient = Database['public']['Tables']['recipe_ingredients']['Update'];

// Menu types
export type Menu = Database['public']['Tables']['menus']['Row'];
export type NewMenu = Database['public']['Tables']['menus']['Insert'];
export type UpdateMenu = Database['public']['Tables']['menus']['Update'];

// MenuItem types
export type MenuItem = Database['public']['Tables']['menu_items']['Row'];
export type NewMenuItem = Database['public']['Tables']['menu_items']['Insert'];
export type UpdateMenuItem = Database['public']['Tables']['menu_items']['Update'];

// Nutritionist types
export type Nutritionist = Database['public']['Tables']['nutritionists']['Row'];
export type NewNutritionist = Database['public']['Tables']['nutritionists']['Insert'];
export type UpdateNutritionist = Database['public']['Tables']['nutritionists']['Update'];

// User state
export interface UserState {
  user: {
    id: string;
    email: string;
  } | null;
  nutritionist: Nutritionist | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Omit<NewNutritionist, 'user_id'>) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

// Dashboard stats
export interface DashboardStats {
  totalClients: number;
  totalRecipes: number;
  totalMenus: number;
  newClientsThisMonth: number;
}