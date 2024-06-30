'use client';
import { getQuestionariosQuestions } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [questionario, setQuestionario] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let questionarios = await getQuestionariosQuestions(params.id);
      setQuestionario(questionarios['data']['questionarios'][0]);
    }
    fetchData();
  }, [params.id]);

  if (!questionario) return <div>Carregando...</div>;
  return (
    <div>
      <button onClick={() => router.back()}>Voltar</button>
      <h2>{questionario.nome}</h2>
      <ul>
        {questionario.perguntas.map((pergunta, index) => (
          <li key={index}>
            <p>{pergunta.descricao}</p>
            <ul>
              {pergunta.alternativas.map((alternativa, indexAlt) => (
                <li key={indexAlt}>{alternativa.descricao}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
