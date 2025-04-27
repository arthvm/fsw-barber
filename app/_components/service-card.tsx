import Image from 'next/image'
import type { BarbershopService } from '../generated/prisma'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface ServiceCardProps {
  service: BarbershopService
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="space-y-1.5">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">{service.name}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="font-bold text-sm text-primary">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Button variant={'secondary'} size={'sm'}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
