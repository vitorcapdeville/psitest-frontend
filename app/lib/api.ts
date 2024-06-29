'use server';
import type { Token } from '@/app/lib/definitions';

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
