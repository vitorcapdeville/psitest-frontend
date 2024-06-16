'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { signup } from './api';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  try {
    await signup(email, password);
  } catch (error) {
    return 'Failed to sign up.';
  }
  return await authenticate(prevState, formData);
}
