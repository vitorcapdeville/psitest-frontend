'use server';
import type {
  Token,
  UserInfo,
  QuestionarioName,
  QuestionarioQuestionsWithAlternatives,
  Respostas,
} from '@/app/lib/definitions';

export async function login(email: string, password: string): Promise<Token> {
  let formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const token = await fetch(`${process.env.GATEWAY_URL}/login`, {
    method: 'POST',
    body: formData,
  });

  if (!token.ok) {
    throw new Error('Failed to fetch data');
  }
  return token.json();
}

export async function signup(
  email: string,
  password: string,
  name: string,
  matricula: string,
): Promise<Token> {
  let formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const user = await fetch(
    `${process.env.GATEWAY_URL}/signup?name=${name}&matricula=${matricula}`,
    {
      method: 'POST',
      body: formData,
      cache: 'no-store',
    },
  );
  if (!user.ok) {
    throw new Error('Failed to fetch data');
  }
  return user.json();
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(`${process.env.GATEWAY_URL}/forgot-password`, {
    method: 'PUT',
    body: email,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}

export async function validateResetPasswordCode(
  email: string,
  code: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.GATEWAY_URL}/validate-reset-password-code`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}

export async function resetPassword(
  email: string,
  newPassword: string,
  code: string,
) {
  const response = await fetch(`${process.env.GATEWAY_URL}/reset-password`, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, new_password: newPassword, code }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}

export async function getUser(token: string): Promise<UserInfo> {
  const response = await fetch(`${process.env.GATEWAY_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json() as Promise<UserInfo>;
}

async function getQuestionarios(query: string) {
  const response = await fetch(`${process.env.GATEWAY_URL}/questionarios`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json().then((data) => data.data.questionarios);
}

export async function getQuestionariosNames(): Promise<
  Array<QuestionarioName>
> {
  const query = `
    query {
      questionarios {
        nome
        id
      }
    }
  `;

  return getQuestionarios(query);
}

export async function getQuestionarioQuestions(
  id: string,
): Promise<QuestionarioQuestionsWithAlternatives> {
  const query = `
    query {
      questionarios(id:${id}){
        nome
        id
        perguntas{
          id
          descricao
          alternativas{
            id  
            descricao
          }
        }
      }
    }
  `;

  return getQuestionarios(query).then((data) => data[0]);
}

export async function getQuestionariosEnviados(email: string) {
  const response = await fetch(
    `${process.env.GATEWAY_URL}/respostas?email=${email}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function getQuestionarioPaciente(email: string) {
  const response = await fetch(
    `${process.env.GATEWAY_URL}/envios?email=${email}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function getRespostasEnvio(envio_id: string): Promise<Respostas> {
  const response = await fetch(
    `${process.env.GATEWAY_URL}/respostas/${envio_id}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function enviarQuestionario(
  psicologo_email: string,
  paciente_email: string,
  questionario_id: string,
): Promise<void> {
  const response = await fetch(`${process.env.GATEWAY_URL}/envio`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      psicologo_email,
      paciente_email,
      questionario_id,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}

export async function responderQuestionario(
  respostas: Array<{
    pergunta_id: string;
    alternativa_id: string;
    envio_id: string;
  }>,
): Promise<void> {
  const response = await fetch(`${process.env.GATEWAY_URL}/responder`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(respostas),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
}
