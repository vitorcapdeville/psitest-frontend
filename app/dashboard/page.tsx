'use server';
import { auth } from '@/auth';
import { getUser } from '@/app/lib/api';
import { UserInfo } from '@/app/lib/definitions';

function UserInfoDisplay({ userInfo }: { userInfo: UserInfo }) {
  return (
    <div>
      <p className="text-sm">Name: John Doe</p>
      <p className="text-sm">E-mail: johndoe@example.com</p>
      <p className="text-sm">Registry Number: 123456</p>
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
