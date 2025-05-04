'use client'

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { quickSearchOptions } from '../_constants/search'
import { SignInDialog } from './signin-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Separator } from './ui/separator'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

export function SiderbarSheet() {
  const { data } = useSession()

  const searchParams = useSearchParams()
  const shopNameFilter = searchParams.get('name')

  async function handleLogout() {
    signOut()
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="px-5 space-y-6 overflow-y-auto">
        <div
          className={`flex items-center gap-3 ${!data?.user && 'justify-between'}`}
        >
          {data?.user ? (
            <>
              <Avatar className="size-12 border-2 border-primary">
                <AvatarImage src={data?.user.image ?? ''} />
              </Avatar>

              <div>
                <p className="font-bold">{data.user.name}</p>
                <p className="text-xs">{data.user.email}</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-bold">Olá, Faça seu Login!</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size={'icon'}>
                    <LogInIcon />
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          <SheetClose asChild>
            <Button className="justify-start gap-2" variant={'ghost'} asChild>
              <Link href="/">
                <HomeIcon size={18} />
                Início
              </Link>
            </Button>
          </SheetClose>

          <Button className="justify-start gap-2" variant={'ghost'} asChild>
            <Link href={'/bookings'}>
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          {quickSearchOptions.map(option => (
            <SheetClose key={option.title} asChild>
              <Button className="justify-start gap-2" variant={'ghost'} asChild>
                <Link
                  href={`/barbershops?service=${option.title}${shopNameFilter ? `&name=${shopNameFilter}` : ''}`}
                >
                  <Image
                    src={option.imageUrl}
                    height={18}
                    width={18}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {data?.user && (
          <>
            <Separator />

            <div className="flex flex-col gap-1">
              <Button
                onClick={handleLogout}
                className="justify-start gap-2"
                variant={'ghost'}
              >
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  )
}
