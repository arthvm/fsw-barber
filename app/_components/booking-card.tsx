import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import type { Prisma } from '../generated/prisma'
import { BookingSummary } from './booking-summary'
import { PhoneItem } from './phone-item'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
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

  return (
    <Sheet>
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
              <h3 className="font-semibold">{booking.service.name}</h3>

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

      <SheetContent className="w-[90%]">
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
      </SheetContent>
    </Sheet>
  )
}
