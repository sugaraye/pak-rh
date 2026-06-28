const SUPABASE_URL =
"https://vbzfohtismmnntkxybjo.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiemZvaHRpc21tbm50a3h5YmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MjM4NzYsImV4cCI6MjA5ODA5OTg3Nn0.otWVNPbcPl5NBrJKxTEuuJDMQTeAMsnWozsFFt0sxqQ
";

window.supabase =
supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
