'use client';
import { enviarRespostasQuestionarioAction } from '@/app/lib/actions';
import {
  getQuestionarioPaciente,
  getQuestionarioQuestions,
} from '@/app/lib/api';
import { QuestionariosComDetalhes } from '@/app/ui/dashboard/questionarios-com-detalhes';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { email: string } }) {
  const email = decodeURIComponent(params.email);

  const [questionario, setQuestionario] = useState(null);
  const [questionario_enviado, setQuestionarioEnviado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const questionario_enviado = await getQuestionarioPaciente(
          params.email,
        );
        if (questionario_enviado) {
          setQuestionarioEnviado(questionario_enviado);
          console.log(questionario_enviado);
          const questionario = await getQuestionarioQuestions(
            questionario_enviado.questionario_id,
          );
          setQuestionario(questionario);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchData();
  }, [params.email]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão de recarregar a página
    const formData = new FormData(event.target); // Coletar dados do formulário
    await enviarRespostasQuestionarioAction(undefined, formData); // Chamar a função para enviar os dados
  };
  if (error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1>Nenhum questionário disponível</h1>
      </div>
    );
  if (!questionario) return <div>Carregando...</div>;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <QuestionariosComDetalhes questionario={questionario} back={false} />
      <input
        type="text"
        name="envio_id"
        value={questionario_enviado.id}
        readOnly
        className="hidden"
      />
      <button
        type="submit"
        className="rounded-md bg-gray-50 p-3 hover:bg-sky-100 hover:text-blue-600"
      >
        Enviar
      </button>
    </form>
  );
}
