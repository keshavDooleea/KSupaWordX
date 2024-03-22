import { CONSTANTS } from "./constants";
import { ENV } from "./env";
import { LANGUAGES } from "./languages";
import { colors } from "./styles/colors";
import { globalStyles } from "./styles/global";
import { supabase } from "./supabase/client";
import { SupabaseTypes } from "./supabase/types";
import { wordManager } from "./supabase/manager";
import { VOCAB_TYPES } from "./vocab";

export { CONSTANTS, wordManager, ENV, colors, globalStyles, supabase, VOCAB_TYPES, LANGUAGES, SupabaseTypes };
