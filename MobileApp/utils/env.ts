export const ENV = {
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    maxStorageSize: parseInt(process.env.EXPO_PUBLIC_SUPABASE_MAX_STORAGE_SIZE!),
  },
};
