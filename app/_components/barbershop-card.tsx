import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import type { Barbershop } from '../generated/prisma'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface BarbershopCardProps {
  barbershop: Barbershop
}

export function BarbershopCard({ barbershop }: BarbershopCardProps) {
  return (
    <Card className="p-0 min-w-[167px]">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-full">
          <Image
            alt={barbershop.name}
            fill
            className="object-cover rounded-xl p-1"
            src={barbershop.imageUrl}
          />

          <Badge className="absolute left-2 top-2 space-x-1 bg-secondary/80">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>

        <div className="px-2 py-3 flex flex-col gap-3">
          <div>
            <h3 className="font-semibold truncate">{barbershop.name}</h3>
            <p className="text-sm text-gray-400 truncate">
              {barbershop.address}
            </p>
          </div>

          <Button variant={'secondary'} className="w-full">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
