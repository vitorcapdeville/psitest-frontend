'use client';

import { Button } from '@/app/ui/button';
import displayErrorMessage from '@/app/ui/error-on-form';
import { lusitana } from '@/app/ui/fonts';
import FormField from '@/app/ui/form-field';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { forgotPasswordAction } from '@/app/lib/actions';

export default function ForgotPasswordForm() {
  const [errorMessage, dispatch] = useFormState(forgotPasswordAction, undefined);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={dispatch} className="space-y-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Forgot password
        </h1>
        <div className="w-full">
          <FormField
            id="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
          />
        </div>
        <ForgtoPasswordButton />
      </form>
      <div className="flex flex-col items-center justify-center">
        <Link href={'login'} className="form-link">
          Back to login
          <ArrowRightIcon className="h-1 w-1 text-gray-50" />
        </Link>
      </div>
      {displayErrorMessage(errorMessage)}
    </div>
  );
}

function ForgtoPasswordButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Send reset link
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
