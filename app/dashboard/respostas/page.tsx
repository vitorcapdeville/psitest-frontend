import { getQuestionariosEnviados } from '@/app/lib/api';
import Link from 'next/link';
import { auth } from '@/auth';

const tableHeaderCellStyle = 'border border-border p-2 text-left';
const tableCellStyle = 'border border-border p-2';

export default async function Page() {
  const session = await auth();
  let envios = await getQuestionariosEnviados(session?.user?.email);
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center">
      <h1 className="text-primary mb-4 text-xl font-bold">Acompanhar envios</h1>
      <div className="bg-card w-11/12 p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={tableHeaderCellStyle}>Paciente</th>
              <th className={tableHeaderCellStyle}>Acompanhar</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.id}>
                <td className={tableCellStyle}>{envio.paciente_email}</td>
                <td className={tableCellStyle}>
                  {envio.respondido && (
                    <Link
                      href={`/dashboard/respostas/${envio.id}`}
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      Ver respostas
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
