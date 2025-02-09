// store/useProfileStore.ts
import { supabase } from '@/app/lib/supabase';
import { create } from 'zustand';

interface ProfileStore {
    profileImage: string | null;
    setProfileImage: (image: string) => void;
    fetchProfileImage: () => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
    profileImage: null,
    setProfileImage: (image) => set({ profileImage: image }),
    fetchProfileImage: async () => {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
            const { data: adminData } = await supabase
                .from('users')
                .select('profileImage')
                .eq('user_Id', data.user.id)
                .single();
            set({ profileImage: adminData?.profileImage || null });
        }
    },
}));
