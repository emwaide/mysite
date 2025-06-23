'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  signIn('google', { callbackUrl: '/' });
}
