import { auth } from "@/auth";

export default async function MainPage() {
  const session = await auth();

  console.log(session.user);

  return <div><h1>Ola</h1></div>;
}
