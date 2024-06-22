'use client';

import { signUp } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import displayErrorMessage from '@/app/ui/error-on-form';
import { lusitana } from '@/app/ui/fonts';
import FormField from '@/app/ui/form-field';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  KeyIcon,
  UserIcon,
  WalletIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(signUp, undefined);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={dispatch} className="space-y-3">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>Sign up</h1>
        <div className="w-full">
          <FormField
            id="name"
            label="Name"
            placeholder="Enter your name"
            Icon={UserIcon}
          />
          <FormField
            id="matricula"
            label="Matricula"
            placeholder="Enter your CFP"
            Icon={WalletIcon}
          />
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
          <FormField
            id="confirmPassword"
            label="Confirm password"
            placeholder="Confirm password"
            Icon={KeyIcon}
          />
        </div>
        <SignUpButton />
      </form>
      <div className="flex flex-col items-center justify-center">
        <Link href={'login'} className="form-link">
          Log in
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Link>
      </div>
      {displayErrorMessage(errorMessage)}
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign up
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
