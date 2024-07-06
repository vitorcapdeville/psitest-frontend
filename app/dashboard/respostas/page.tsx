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
              <th className={tableHeaderCellStyle}>Status</th>
              <th className={tableHeaderCellStyle}>Acompanhar</th>
            </tr>
          </thead>
          <tbody>
            {envios.map((envio) => (
              <tr key={envio.id}>
                <td className={tableCellStyle}>{envio.paciente_email}</td>
                <td className={tableCellStyle}>Respondido</td>
                <td className={tableCellStyle}>
                  <Link
                    href={`/dashboard/respostas/${envio.id}`}
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    Ver respostas
                  </Link>
                </td>
              </tr>
              // <li key={envio.id}
              // <Link href={`/dashboard/respostas/${envio.id}`}>
              //   {envio.paciente_email}
              // </Link>
              // </li>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // return (
  //   <ul>
  // {envios.map((envio) => (
  //   <li key={envio.id}>
  //     <Link href={`/dashboard/respostas/${envio.id}`}>
  //       {envio.paciente_email}
  //     </Link>
  //   </li>
  // ))}
  //   </ul>
  // );
}

// const tableHeaderCellStyle = "border border-border p-2 text-left";
// const tableCellStyle = "border border-border p-2";

// const TrackingComponent = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
//       <h1 className="text-xl font-bold text-primary mb-4">Acompanhar envios</h1>
//       <div className="w-11/12 bg-card p-4 rounded-lg shadow-md">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className={tableHeaderCellStyle}>Paciente <span className="inline-block transform rotate-180">▼</span></th>
//               <th className={tableHeaderCellStyle}>Status <span className="inline-block transform rotate-180">▼</span></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className={tableCellStyle}></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TrackingComponent;
