import Link from 'next/link';
import { HeaderProps } from '@/lib/types';

export default function Header({ title = "My Blog", tagline }: HeaderProps) {
  return (
    <header className="mb-12">
      <Link href="/" className="block">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          {title}
        </h1>
        {tagline && (
          <p className="text-zinc-600 dark:text-zinc-400">
            {tagline}
          </p>
        )}
      </Link>
    </header>
  );
}
