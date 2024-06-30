import { getQuestionariosEnviados } from '@/app/lib/api';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  let envios = await getQuestionariosEnviados(session?.user?.email);
  return (
    <ul>
      {envios.map((envio) => (
        <li key={envio.id}>
          <Link href={`/dashboard/respostas/${envio.id}`}>
            {envio.paciente_email}
          </Link>
        </li>
      ))}
    </ul>
  );
}
