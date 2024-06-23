'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { forgotPassword, signup, validateResetPasswordCode, resetPassword } from './api';
import { redirect } from 'next/navigation';

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

export async function signupAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const name = formData.get('name') as string;
  const matricula = formData.get('matricula') as string;
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  try {
    await signup(email, password, name, matricula);
  } catch (error) {
    return 'Failed to sign up.';
  }
  return await authenticate(prevState, formData);
}

export async function forgotPasswordAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  try {
    await forgotPassword(email);
  } catch (error) {
    return 'Failed to send reset link.';
  }
  const encodedEmail = encodeURIComponent(email);
  return redirect(`/reset-password-code?email=${encodedEmail}`);
}

export async function resetPasswordCodeAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const code = formData.get('code') as string;
  const email = formData.get('email') as string;
  try {
    await validateResetPasswordCode(email, code);
  } catch (error) {
    return 'Failed to verify code.';
  }
  const encodedEmail = encodeURIComponent(email);
  return redirect(`/reset-password?email=${encodedEmail}&code=${code}`);
}

export async function resetPasswordAction(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const code = formData.get('code') as string;
  const newPassword = formData.get('password') as string;
  const confirmNewPassword = formData.get('confirmPassword') as string;
  if (newPassword !== confirmNewPassword) {
    return 'Passwords do not match.';
  }
  try {
    await resetPassword(email, newPassword, code);
  } catch (error) {
    return 'Failed to change password.';
  }
  const encodedEmail = encodeURIComponent(email);
  const loginData = new FormData();
  loginData.append('email', email);
  loginData.append('password', newPassword);
  return authenticate(prevState, formData);
}