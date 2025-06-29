import type { User } from '@supabase/supabase-js';

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Twój profil</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>
      {/* możesz tu dorzucić np. datę rejestracji, avatar z Google itd. */}
    </div>
  );
}