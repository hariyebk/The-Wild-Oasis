
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://momqhglqirktrsrpcuam.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vbXFoZ2xxaXJrdHJzcnBjdWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMTk0MjEsImV4cCI6MjAwODg5NTQyMX0.xgv42LSWwElvackG8bnW9vYs5LGdOacOCMXZBY05IC0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase