'use client';
import {
  QuestionarioQuestionsWithAlternatives,
  Respostas,
} from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/ui/dashboard/dropdown';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const QuestionariosComDetalhes = ({
  questionario,
  respostas = null,
}: {
  questionario: QuestionarioQuestionsWithAlternatives;
  respostas: Respostas | null;
}) => {
  const router = useRouter();
  console.log("respostas", respostas)

  // Função para encontrar a resposta correspondente à pergunta
  const encontrarRespostaParaPergunta = (perguntaId: string) => {
    // console.log(respostas.respostas.find((r) => {
    //   console.log("r.pergunta_id", r.pergunta_id)
    //   console.log("perguntaId", perguntaId)
    //   r.pergunta_id == perguntaId
    // }))
    return respostas
      ? respostas.respostas.find((r) => r.pergunta_id == perguntaId)
      : undefined;
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center space-y-4 p-4">
      <div className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-center">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="w-6" />
          </button>
          <h1 className="flex-grow text-center text-lg font-bold">
            {questionario.nome}
          </h1>
        </div>
        <ul>
          {questionario.perguntas.map((pergunta) => {
            // Encontrar a resposta correspondente, se existir
            const respostaEscolhidaObj = encontrarRespostaParaPergunta(
              pergunta.id,
            );
            const respostaEscolhida = respostaEscolhidaObj
              ? respostaEscolhidaObj.alternativa_id
                  : undefined;
            // console.log(respostaEscolhida)
            return (
              <Dropdown
                question={pergunta}
                respostaEscolhida={respostaEscolhida}
                key={pergunta.id}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
