import { createClient } from "@supabase/supabase-js";

// 使用你的 Supabase URL 和 API Key
const SUPABASE_URL = "https://yrkjihgjvetokheavydx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlya2ppaGdqdmV0b2toZWF2eWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODU1NTIsImV4cCI6MjA1NjU2MTU1Mn0.H_JZXcqcYaMuSVPKjBrjbmInG6rFDaH4HSZ2yvbQgHI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
