'use client';

import { Button } from '@/app/ui/button';
import displayErrorMessage from '@/app/ui/error-on-form';
import { lusitana } from '@/app/ui/fonts';
import FormField from '@/app/ui/form-field';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { KeyIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { resetPasswordAction } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordForm() {
  const [errorMessage, dispatch] = useFormState(resetPasswordAction, undefined);
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get('email') ?? '');
  const code = decodeURIComponent(searchParams.get('code') ?? '');

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={dispatch} className="space-y-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Confirm your identity
        </h1>
        <div className="w-full">
          <input
            className="hidden"
            id="email-hidden"
            name="email"
            type="email"
            defaultValue={email}
          />
          <input
            className="hidden"
            id="code-hidden"
            name="code"
            type="text"
            defaultValue={code}
          />
          <FormField
            id="password"
            label="Password"
            placeholder="Enter your new password"
            type="password"
            Icon={KeyIcon}
          />
          <FormField
            id="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your new password"
            type="password"
            Icon={KeyIcon}
          />
        </div>
        <ResetPasswordButton />
      </form>
      {displayErrorMessage(errorMessage)}
    </div>
  );
}

function ResetPasswordButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Confirmar
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
