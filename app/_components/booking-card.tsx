import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Prisma } from '../generated/prisma'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

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
  const isConfirmed = isFuture(booking.date)

  return (
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
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
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
  )
}
