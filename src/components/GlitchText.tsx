import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function GlitchText({ text, className, as: Component = 'span' }: GlitchTextProps) {
  return (
    <Component className={cn('glitch-text inline-block', className)} data-text={text}>
      {text}
    </Component>
  );
}
