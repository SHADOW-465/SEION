"use client";

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext, useState, useEffect } from 'react';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

    useEffect(() => {
        const client = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        setSupabase(client);
    }, []);

    return (
        <SupabaseContext.Provider value={supabase}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = () => {
    const context = useContext(SupabaseContext);
    if (context === undefined) {
        throw new Error('useSupabase must be used within a SupabaseProvider');
    }
    return context;
};
