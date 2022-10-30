import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseServiceRole = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default supabaseServiceRole;
