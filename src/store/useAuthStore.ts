import { create } from 'zustand';
import { supabase } from '../supabase';
import { Nutritionist, NewNutritionist, UserState } from '../types';

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  nutritionist: null,
  isLoading: false,
  error: null,

  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Fetch nutritionist profile
        const { data: nutritionistData, error: nutritionistError } = await supabase
          .from('nutritionists')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        if (nutritionistError) throw nutritionistError;

        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
          },
          nutritionist: nutritionistData as Nutritionist,
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  signUp: async (email: string, password: string, userData: Omit<NewNutritionist, 'user_id'>) => {
    set({ isLoading: true, error: null });
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // Create nutritionist profile
      const nutritionistData: NewNutritionist = {
        ...userData,
        user_id: data.user.id,
      };

      const { error: profileError } = await supabase
        .from('nutritionists')
        .insert(nutritionistData);

      if (profileError) throw profileError;

      set({
        user: {
          id: data.user.id,
          email: data.user.email || '',
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, nutritionist: null, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));