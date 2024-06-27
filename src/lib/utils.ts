import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from '@clerk/nextjs/server';

export function getUserDetails() {
  const { sessionClaims } = auth();
  if (!sessionClaims) {
    throw new Error('No session claims');
  }

  return {
    userId: sessionClaims.sub,
    orgId: sessionClaims.org_id ? sessionClaims.org_id : sessionClaims.sub,
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
