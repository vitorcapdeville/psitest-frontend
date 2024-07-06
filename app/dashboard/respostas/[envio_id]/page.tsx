'use client';
import { useEffect, useState } from 'react';
import { getRespostasEnvio, getQuestionarioQuestions } from '@/app/lib/api';
import { QuestionariosComDetalhes } from '@/app/ui/dashboard/questionarios-com-detalhes';

export default function Page({ params }: { params: { envio_id: string } }) {
  const [respostas, setRespostas] = useState({});
  const [questionario, setQuestionario] = useState({});

  useEffect(() => {
    async function fetchData() {
      const respostas = await getRespostasEnvio(params.envio_id);
      if (respostas) {
        setRespostas(respostas);
        const questionario = await getQuestionarioQuestions(
          respostas.questionario_id,
        );
        setQuestionario(questionario);
      }
    }
    fetchData();
  }, [params.envio_id]);

  if (
    Object.keys(respostas).length === 0 ||
    Object.keys(questionario).length === 0
  )
    return <div>Carregando...</div>;
  return (
    <QuestionariosComDetalhes
      questionario={questionario}
      respostas={respostas}
    />
  );
}
