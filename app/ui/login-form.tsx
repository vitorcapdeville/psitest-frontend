'use client';

import { authenticate } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import displayErrorMessage from '@/app/ui/error-on-form';
import { lusitana } from '@/app/ui/fonts';
import FormField from '@/app/ui/form-field';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={dispatch} className="space-y-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>Log in</h1>
        <div className="w-full">
          <FormField
            id="email"
            label="Email"
            placeholder="Enter your email address"
            Icon={AtSymbolIcon}
          />
          <FormField
            id="password"
            label="Password"
            placeholder="Enter password"
            Icon={KeyIcon}
          />
        </div>
        <LoginButton />
      </form>
      <div className="flex flex-col items-center justify-center">
        <Link href={'signup'} className="form-link">
          Sign up
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Link>
      </div>
      {displayErrorMessage(errorMessage)}
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
