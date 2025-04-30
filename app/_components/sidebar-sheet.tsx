import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { quickSearchOptions } from '../_constants/search'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Separator } from './ui/separator'
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'

export function SiderbarSheet() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="px-5 space-y-6 overflow-y-auto">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="font-bold">Olá, Faça seu Login!</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button size={'icon'}>
                <LogInIcon />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[90%]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>

              <Button variant={'outline'} className="gap-2 font-bold">
                <Image
                  src={'/google.svg'}
                  alt="Logar com o google"
                  width={18}
                  height={18}
                />
                Google
              </Button>
            </DialogContent>
          </Dialog>
          {/*
         <Avatar className="size-12 border-2 border-primary">
            <AvatarImage src={'https://github.com/arthvm.png'} />
          </Avatar>

          <div>
            <p className="font-bold">Arthur Mariano</p>
            <p className="text-xs">arthvm@proton.me</p>
          </div>
          */}
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

          <Button className="justify-start gap-2" variant={'ghost'}>
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          {quickSearchOptions.map(option => (
            <Button
              key={option.title}
              className="justify-start gap-2"
              variant={'ghost'}
            >
              <Image
                src={option.imageUrl}
                height={18}
                width={18}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          <Button className="justify-start gap-2" variant={'ghost'}>
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </div>
    </SheetContent>
  )
}
