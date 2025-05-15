export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string
          age: number | null
          gender: string | null
          height: number | null
          weight: number | null
          goal: string | null
          notes: string | null
          nutritionist_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone: string
          age?: number | null
          gender?: string | null
          height?: number | null
          weight?: number | null
          goal?: string | null
          notes?: string | null
          nutritionist_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string
          age?: number | null
          gender?: string | null
          height?: number | null
          weight?: number | null
          goal?: string | null
          notes?: string | null
          nutritionist_id?: string
        }
      }
      ingredients: {
        Row: {
          id: string
          created_at: string
          name: string
          category: string
          calories: number
          proteins: number
          carbs: number
          fats: number
          fiber: number
          sugar: number
          unit: string
          cost_per_unit: number
          nutritionist_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          category: string
          calories: number
          proteins: number
          carbs: number
          fats: number
          fiber?: number
          sugar?: number
          unit: string
          cost_per_unit: number
          nutritionist_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          category?: string
          calories?: number
          proteins?: number
          carbs?: number
          fats?: number
          fiber?: number
          sugar?: number
          unit?: string
          cost_per_unit?: number
          nutritionist_id?: string
        }
      }
      recipes: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          preparation_time: number
          cooking_time: number
          servings: number
          nutritionist_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          preparation_time: number
          cooking_time: number
          servings: number
          nutritionist_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          preparation_time?: number
          cooking_time?: number
          servings?: number
          nutritionist_id?: string
        }
      }
      recipe_ingredients: {
        Row: {
          id: string
          recipe_id: string
          ingredient_id: string
          quantity: number
        }
        Insert: {
          id?: string
          recipe_id: string
          ingredient_id: string
          quantity: number
        }
        Update: {
          id?: string
          recipe_id?: string
          ingredient_id?: string
          quantity?: number
        }
      }
      menus: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          client_id: string
          nutritionist_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          client_id: string
          nutritionist_id: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          client_id?: string
          nutritionist_id?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          menu_id: string
          recipe_id: string
          day_of_week: number
          meal_type: string
        }
        Insert: {
          id?: string
          menu_id: string
          recipe_id: string
          day_of_week: number
          meal_type: string
        }
        Update: {
          id?: string
          menu_id?: string
          recipe_id?: string
          day_of_week?: number
          meal_type?: string
        }
      }
      nutritionists: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          email: string
          phone: string
          credentials: string | null
          specialization: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          email: string
          phone: string
          credentials?: string | null
          specialization?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          email?: string
          phone?: string
          credentials?: string | null
          specialization?: string | null
        }
      }
    }
  }
}