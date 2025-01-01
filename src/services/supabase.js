import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tyrfggjtfqaldwemrusm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cmZnZ2p0ZnFhbGR3ZW1ydXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2NDA3ODEsImV4cCI6MjA0OTIxNjc4MX0.4R63puW0_4wQ77g4lkLSaL1Clg21VDjcNSZPzYYS6G0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
