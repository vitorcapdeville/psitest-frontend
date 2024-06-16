import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main>
      <p
        className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
      >
        Home Page
      </p>
      <Link href="/login">
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  );
}
