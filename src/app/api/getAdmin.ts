import { supabase } from "../lib/supabase";

export const getAdmin = async () => {
    const { data, error } = await supabase.from('users').select('*').eq('isAdmin', true);
    if (error) {
        console.error('Error fetching admin data:', error);
        return;
    }
    const adminData = data && data.length > 0 ? data[0] : null;
    if (adminData) {
        return adminData;
    }
};
