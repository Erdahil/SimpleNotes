import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdkzpckgabmcbtgoifup.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impka3pwY2tnYWJtY2J0Z29pZnVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjkwMTcsImV4cCI6MjA2NjgwNTAxN30.nOPVF1oO0lTWM34-SweZ2t1hEHYVzMMnSk0BQRCiNQ4';
export const supabase = createClient(supabaseUrl, supabaseKey);