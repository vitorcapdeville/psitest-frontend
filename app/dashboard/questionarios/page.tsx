import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getQuestionariosNames } from '@/app/lib/api';
const sharedClasses = {
  input:
    'w-full p-3 border border-input rounded-lg focus:outline-none focus:ring focus:ring-primary',
  listItem: 'p-3 hover:bg-muted cursor-pointer',
};

export default async function Page() {
  let questionarios = await getQuestionariosNames();
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center ">
      <h1 className="text-primary mb-4 text-xl font-bold">
        Buscar testes disponíveis
      </h1>
      <div className="relative mb-6 w-3/4 max-w-md">
        <input
          type="text"
          placeholder="Buscar testes..."
          className={sharedClasses.input}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
      </div>
      <div className="w-3/4 max-w-md">
        <ul className="border-border divide-border divide-y rounded-lg border">
          {questionarios.map((questionario) => (
            <li key={questionario.id} className={sharedClasses.listItem}>
              <Link
                href={`/dashboard/questionarios/detalhes/${questionario.id}`}
              >
                {questionario.nome}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
