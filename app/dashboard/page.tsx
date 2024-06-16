import { auth } from "@/auth";

export default async function MainPage() {
  const session = await auth();

  console.log(session?.user);

  return (
    <main>
      <div><h1>Ola Mundo</h1></div>
    </main>
  );
}