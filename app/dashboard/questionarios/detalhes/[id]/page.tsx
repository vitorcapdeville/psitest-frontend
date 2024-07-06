'use client';
import { getQuestionarioQuestions } from '@/app/lib/api';
import { useEffect, useState } from 'react';
import { QuestionariosComDetalhes } from '@/app/ui/dashboard/questionarios-com-detalhes';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const [questionario, setQuestionario] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let questionarios = await getQuestionarioQuestions(params.id);
      setQuestionario(questionarios);
    }
    fetchData();
  }, [params.id]);

  if (!questionario) return <div>Carregando...</div>;
  return (
    <div className="flex flex-col items-center">
      <QuestionariosComDetalhes questionario={questionario} />
      <Link
        href={`/dashboard/questionarios/detalhes/${params.id}/enviar`}
        className="rounded-md bg-gray-50 p-3 hover:bg-sky-100 hover:text-blue-600"
      >
        Enviar para paciente
      </Link>
    </div>
  );
}
