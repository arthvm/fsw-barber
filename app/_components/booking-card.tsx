'use client'

import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteBooking } from '../_actions/delete-booking'
import type { Prisma } from '../generated/prisma'
import { BookingSummary } from './booking-summary'
import { PhoneItem } from './phone-item'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface BookingCardProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingCard({ booking }: BookingCardProps) {
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  function handleSheetOpenChange(isOpen: boolean) {
    setIsSheetOpen(isOpen)
  }

  async function handleCancelBooking() {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cancelar a reserva. Tente novamente.')
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="p-0 min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-3 pl-3">
              <Badge
                className="w-fit"
                variant={isConfirmed ? 'default' : 'secondary'}
              >
                {isConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h3 className="font-semibold text-left">
                {booking.service.name}
              </h3>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2">
              <p className="text-sm capitalize">
                {format(booking.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, 'dd', { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informacões da Reserva</SheetTitle>
        </SheetHeader>

        <Separator />

        <div className="px-4 py-2 space-y-6">
          <div className="relative h-[180px] w-full flex items-end">
            <Image
              alt={`Mapa da ${barbershop.name}`}
              src={'/map.png'}
              fill
              className="object-cover rounded-xl"
            />

            <Card className="z-50 p-0 w-full mb-3 mx-5">
              <CardContent className="px-5 py-3 flex gap-3 items-center">
                <Avatar className="size-12">
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs truncate">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <Badge
              className="w-fit"
              variant={isConfirmed ? 'default' : 'secondary'}
            >
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <BookingSummary
              service={booking.service}
              barbershopName={barbershop.name}
              selectedDay={booking.date}
              selectedTime={format(booking.date, 'HH:mm', { locale: ptBR })}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter>
          <div className="flex items-center gap-3 w-full">
            <SheetClose asChild>
              <Button variant={'outline'} className="flex-1/2">
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!isConfirmed}
                  variant={'destructive'}
                  className="flex-1/2"
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex flex-row gap-3">
                  <AlertDialogCancel className="flex-1/2">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="flex-1/2"
                      variant={'destructive'}
                      onClick={handleCancelBooking}
                    >
                      Confirmar
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
