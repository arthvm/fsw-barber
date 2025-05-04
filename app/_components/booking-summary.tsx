import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { BarbershopService } from '../generated/prisma'
import { Card, CardContent } from './ui/card'

interface BookingSummaryProps {
  service: BarbershopService
  barbershopName: string
  selectedDay: Date
  selectedTime: string
}

// TODO: improve interface
export function BookingSummary({
  service,
  barbershopName,
  selectedDay,
  selectedTime,
}: BookingSummaryProps) {
  return (
    <Card className="p-0">
      <CardContent className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm">
            {format(selectedDay, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm">{selectedTime}</p>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm">{barbershopName}</p>
        </div>
      </CardContent>
    </Card>
  )
}
