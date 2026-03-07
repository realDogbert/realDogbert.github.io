import { HeaderProps } from '@/lib/types';

export default function Header({ title = "Grob skizziert", tagline }: HeaderProps) {
  return (
    <header className="mb-16 animate-fade-in-up">
      <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-neutral-900 leading-[0.95]">
        {title}<span className="text-orange">.</span>
      </h1>
      {tagline && (
        <p className="mt-5 text-base sm:text-lg text-neutral-400 font-body max-w-md leading-relaxed">
          {tagline}
        </p>
      )}
      <div className="mt-8 w-12 h-[3px] bg-orange" aria-hidden="true" />
    </header>
  );
}
