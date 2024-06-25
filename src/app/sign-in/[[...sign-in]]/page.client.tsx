'use client'
import { SignInButton } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function SignInPage() {
  const [redir, setRedir] = useState<string | undefined>()

  useEffect(() => {
    let redirect_url = window.location.search.split('redirect_url=')[1]
    if(redirect_url) {
      redirect_url = decodeURIComponent(redirect_url)
      redirect_url = redirect_url.replace(window.location.origin, '')
      setRedir(redirect_url)
    }
  }, [])

  return (
    <div className='flex flex-col items-center gap-4'>
      <SignInButton mode="modal" forceRedirectUrl={redir}/>
    </div>
  )
}

export default SignInPage