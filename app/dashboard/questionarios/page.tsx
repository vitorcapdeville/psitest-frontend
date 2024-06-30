import { getQuestionariosNames } from '@/app/lib/api';
import Link from 'next/link';

export default async function Page() {
  let questionarios = await getQuestionariosNames();
  questionarios = questionarios['data']['questionarios'];
  return (
    <ul>
      {questionarios.map((questionario) => (
        <li key={questionario.id}>
          <Link href={`/dashboard/questionarios/detalhes/${questionario.id}`}>{questionario.nome}</Link>
        </li>
      ))}
    </ul>
  );
}
