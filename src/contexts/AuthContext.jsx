import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchProfile = useCallback(async (userId) => {
        // Fetch dari profiles
        const { data: profData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (!error && profData) {
            let combinedData = { ...profData }
            
            // Jika dia member, fetch juga data customer (loyalty)-nya
            if (profData.role === 'member') {
                const { data: custData } = await supabase
                    .from('customers')
                    .select('id, name, total_points, tier_id, tiers(name)')
                    .eq('auth_id', userId)
                    .single()
                
                if (custData) {
                    combinedData.customer_data = custData
                }
            }
            
            setProfile(combinedData)
        } else {
            setProfile(null)
        }
    }, [])

    useEffect(() => {
        // Ambil session awal
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                await fetchProfile(session.user.id)
            }
            setLoading(false)
        })

        // Subscribe perubahan auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session)
                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setProfile(null)
                }
                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [fetchProfile])

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        return { data, error }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setProfile(null)
        setSession(null)
    }

    const refreshProfile = () => {
        if (session?.user) fetchProfile(session.user.id)
    }

    const value = {
        session,
        profile,
        loading,
        signIn,
        signOut,
        refreshProfile,
        isAdmin: profile?.role === 'admin' && profile?.is_active,
        isActiveStaff: profile?.is_active === true,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider')
    return context
}
