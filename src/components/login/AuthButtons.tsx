'use client';
import { signOut } from 'next-auth/react';

type Props = {
  userName?: string | null;
};

export default function AuthNavActions({ userName }: Props) {
  return userName ? (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-primary hover:underline text-sm bg-transparent border-none p-0"
    >
      Log out
    </button>
  ) : (
    <a href="/login" className="text-primary hover:underline text-sm">
      Log in
    </a>
  );
}
