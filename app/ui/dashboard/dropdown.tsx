import { Question } from '@/app/lib/definitions';

export const Dropdown = ({
  question,
  respostaEscolhida = null,
}: {
  question: Question;
  respostaEscolhida: string | null;
  }) => {
  return (
    <div className="mb-4">
      <label className="text-muted-foreground mb-2 block text-lg">
        {question.descricao}
      </label>
      <div className="relative">
        {respostaEscolhida ? (
          // Se respostaEscolhida não for null, mostra apenas a alternativa escolhida
          <select
            className="bg-input border-border text-foreground focus:border-primary block w-full appearance-none rounded border px-3 py-2 pr-8 leading-tight focus:outline-none focus:ring"
            disabled
          >
            {question.alternativas
              .filter((alternativa) => alternativa.id == respostaEscolhida)
              .map((alternativa, index) => (
                <option key={index} value={alternativa.id}>
                  {alternativa.descricao}
                </option>
              ))}
          </select>
        ) : (
          // Se respostaEscolhida for null, mostra todas as alternativas
          <select className="bg-input border-border text-foreground focus:border-primary block w-full appearance-none rounded border px-3 py-2 pr-8 leading-tight focus:outline-none focus:ring">
            {question.alternativas.map((alternativa, index) => (
              <option key={index} value={alternativa.id}>
                {alternativa.descricao}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
