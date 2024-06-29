import { auth } from '@/auth';

export default async function MainPage() {
  const session = await auth();
  return (
    <main>
      <div>
        <h1>Ola {session?.user?.email}</h1>
      </div>
    </main>
  );
}
