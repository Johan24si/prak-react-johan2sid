import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://clukobisrvdmcdxbosfu.supabase.co'
const supabaseAnonKey = 'sb_publishable_9hPjB45t8bQekfqP7Z8rWQ_EsWFumx5'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
