'use server';
import { auth } from '@/auth';
import { getUser } from '@/app/lib/api';
import { UserInfo } from '@/app/lib/definitions';

function UserInfoDisplay({ userInfo }: { userInfo: UserInfo }) {
  return (
    <form>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={userInfo.email} disabled />
      </div>
      <div>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={userInfo.name} disabled />
      </div>
      <div>
        <label htmlFor="matricula">Matrícula:</label>
        <input type="text" id="matricula" value={userInfo.matricula} disabled />
      </div>
    </form>
  );
}

export default async function MainPage() {
  const session = await auth();
  let user = {};
  try {
    user = await getUser(session?.user?.access_token);
  } catch (error) {
    console.log("Failed to fetch user data", error)
  }

  return (
    <main>
      <UserInfoDisplay userInfo={user} />
    </main>
  );
}
