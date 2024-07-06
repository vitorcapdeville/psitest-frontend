'use server';
import { auth } from '@/auth';
import { getUser } from '@/app/lib/api';
import { UserInfo } from '@/app/lib/definitions';

function UserInfoDisplay({ userInfo }: { userInfo: UserInfo }) {
  return (
    <div>
      <p className="text-sm">Nome: {userInfo.name}</p>
      <p className="text-sm">E-mail: {userInfo.email}</p>
      <p className="text-sm">Matricula: {userInfo.matricula}</p>
    </div>
  );
}

export default async function MainPage() {
  const session = await auth();
  let user = {};
  try {
    user = await getUser(session?.user?.access_token);
  } catch (error) {
    console.log('Failed to fetch user data', error);
  }

  return (
    <main>
      <UserInfoDisplay userInfo={user} />
    </main>
  );
}
