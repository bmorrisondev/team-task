import { SignInButton } from '@clerk/nextjs'
import React from 'react'
import { headers } from 'next/headers';
import { NextRequest } from "next/server"

function SignInPage() {
  let redir: string | undefined = undefined
  const headersList = headers()
  const clerkUrlHeader = headersList.get("x-clerk-clerk-url")
  if(clerkUrlHeader && clerkUrlHeader.includes('redirect_url=')) {
    const request = new NextRequest(clerkUrlHeader)
    let redirect_url = request.nextUrl.search.split('redirect_url=')[1]
    if(redirect_url) {
      redirect_url = decodeURIComponent(redirect_url)
      redirect_url = redirect_url.replace(request.nextUrl.origin, '')
      redir = redirect_url
    }
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <SignInButton mode="modal" forceRedirectUrl={redir}/>
    </div>
  )
}

export default SignInPage