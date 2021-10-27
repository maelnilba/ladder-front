const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SPURL
const supabaseAnonKey = process.env.SBKEY
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
