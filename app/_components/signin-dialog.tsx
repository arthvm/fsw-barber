'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { Button } from './ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

export function SignInDialog() {
  async function handleLoginWithGoogle() {
    await signIn('google')
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={'outline'}
        onClick={handleLoginWithGoogle}
        className="gap-2 font-bold"
      >
        <Image
          src={'/google.svg'}
          alt="Logar com o google"
          width={18}
          height={18}
        />
        Google
      </Button>
    </>
  )
}
