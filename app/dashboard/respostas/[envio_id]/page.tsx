'use client';
import { getRespostasEnvio } from '@/app/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { envio_id: string } }) {
  const router = useRouter();
  const [respostas, setRespostas] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let respostas = await getRespostasEnvio(params.envio_id);
      setRespostas(respostas);
    }
    fetchData();
  }, [params.envio_id]);

  if (!respostas) return <div>Carregando...</div>;
  return (
    <div>
      <button onClick={() => router.back()}>Voltar</button>
      <h2>Questionario {respostas.questionario_id}</h2>
      <ul>
        {respostas.respostas.map((resposta, index) => (
          <li key={index}>
            <p>Pergunta: {resposta.pergunta_id}</p>
            <p>Resposta: {resposta.alternativa_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
