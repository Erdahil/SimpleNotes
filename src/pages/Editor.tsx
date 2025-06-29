import { supabase } from '../services/supabase.ts';
import type { User } from '@supabase/supabase-js';

const handleLogout = async () => {
    await supabase.auth.signOut();
};

export default function Editor({ user }: { user: User }) {
    return (
        <div className="p-4">
        <p>Witaj, {user.email}</p>
        {/* tu później dasz swój canvas itp. */}
        <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Wyloguj się
        </button>
        </div>
    );
}
