// Import the createBrowserClient function from the Supabase JavaScript library
import { createBrowserClient } from '@supabase/ssr';

// Define constants for Supabase URL and anonymous key.
// These values are retrieved from the environment variables.
// The 'as string' assertion ensures that TypeScript treats these variables as strings.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a Supabase client instance using the defined URL and anonymous key.
// This client can be used to interact with the Supabase backend services.
export const createClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export const db =  createClient
