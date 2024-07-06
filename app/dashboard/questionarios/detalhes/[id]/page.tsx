'use client';
import { getQuestionarioQuestions } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown } from '@/app/ui/dashboard/dropdown';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { QuestionariosComDetalhes } from '@/app/ui/dashboard/questionarios-com-detalhes';

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
    <QuestionariosComDetalhes questionario={questionario} />
  );
}
