'use client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getQuestionarioQuestions } from '@/app/lib/api';
import { useFormState, useFormStatus } from 'react-dom';
import { enviarQuestionarioAction } from '@/app/lib/actions';
import displayErrorMessage from '@/app/ui/error-on-form';

const sharedClasses = {
  inputContainer: 'relative',
  input: 'w-full px-4 py-2 border border-border rounded-lg text-center',
  editIcon: 'absolute right-4 top-1/2 transform -translate-y-1/2',
  button: 'bg-primary text-primary-foreground px-6 py-2 rounded-full',
};

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [questionario, setQuestionario] = useState('');
  const [errorMessage, dispatch] = useFormState(
    enviarQuestionarioAction,
    undefined,
  );

  useEffect(() => {
    async function fetchData() {
      let questionarios = await getQuestionarioQuestions(params.id);
      setQuestionario(questionarios.nome);
    }
    fetchData();
  }, [params.id]);
  return (
    <form action={dispatch}>
      <div className="bg-background text-foreground flex flex-col items-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-4 flex items-center justify-center">
            <button onClick={() => router.back()}>
              <ArrowLeftIcon className="w-6" />
            </button>
            <h1 className="flex-grow text-center text-lg font-bold">
              Escolha o paciente e questionário
            </h1>
          </div>
          <div className="mb-6">
            <label className="text-primary mb-2 block text-center">
              Paciente
            </label>
            <div className={sharedClasses.inputContainer}>
              <input
                type="email"
                name="email"
                placeholder="Digite o email do paciente"
                className={sharedClasses.input}
              />
              {/* <span className={sharedClasses.editIcon}>
              <img aria-hidden="true" alt="edit-icon" src="https://openui.fly.dev/openui/16x16.svg?text=✏️" />
            </span> */}
            </div>
          </div>
          <div className="mb-6">
            <label className="text-primary mb-2 block text-center">
              Questionario
            </label>
            <div className={sharedClasses.inputContainer}>
              <input
                type="text"
                name="questionario"
                value={questionario}
                className={sharedClasses.input}
                readOnly
              />
              {/* <span className={sharedClasses.editIcon}>
              <img aria-hidden="true" alt="edit-icon" src="https://openui.fly.dev/openui/16x16.svg?text=✏️" />
            </span> */}
            </div>
          </div>
        </div>
        <button className="rounded-md bg-gray-50 p-3 hover:bg-sky-100 hover:text-blue-600">
          Enviar para paciente
        </button>
        {displayErrorMessage(errorMessage)}
      </div>
    </form>
  );
}
