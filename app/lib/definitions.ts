// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Token = {
  access_token: string;
  token_type: string;
};

export type User = {
  email: string;
  verified: boolean;
  access_token: string;
};

export type UserInfo = {
  email: string;
  name: string;
  matricula: string;
  full_name: string | undefined;
};

export type QuestionarioName = {
  nome: string;
  id: string;
};

export type Alternativa = {
  id: string;
  descricao: string;
};

export type Question = {
  id: string;
  descricao: string;
  alternativas: Array<Alternativa>;
};

export type QuestionarioQuestionsWithAlternatives = {
  nome: string;
  id: string;
  perguntas: Array<Question>;
};

export type Respostas = {
  paciente_email: string;
  psicologo_email: string;
  questionario_id: string;
  respostas: Array<{
    pergunta_id: string;
    alternativa_id: string;
  }>;
};
