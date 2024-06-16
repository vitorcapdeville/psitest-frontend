import type { User } from '@/app/lib/definitions';

export async function login(email: string, password: string): Promise<User> {
  let formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const user = await fetch(`${process.env.GATEWAY_URL}/login`, {
    method: 'POST',
    body: formData,
  });

  if (!user.ok) {
    throw new Error('Failed to fetch data');
  }
  return user.json();
}
