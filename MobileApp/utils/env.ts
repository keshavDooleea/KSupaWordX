export const ENV = {
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    maxSize: parseInt(process.env.EXPO_PUBLIC_SUPABASE_MAX_SIZE!),
  },
};
