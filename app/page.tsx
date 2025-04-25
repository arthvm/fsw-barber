import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { BarbershopCard } from './_components/barbershop-card'
import { BookingCard } from './_components/booking-card'
import { Header } from './_components/header'
import { Button } from './_components/ui/button'
import { Card, CardContent } from './_components/ui/card'
import { Input } from './_components/ui/input'
import { quickSearchOptions } from './_constants/search'
import { db } from './_lib/prisma'

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <div>
      <Header />

      <div className="p-5 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Ola, Arthur!</h2>
          <p>Sexta-feira, 25 de Abril</p>
        </div>

        <div className="flex items-center gap-2">
          <Input placeholder="Faca sua busca..." />
          <Button size={'icon'}>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(quickSearchOption => (
            <Button
              key={quickSearchOption.title}
              className="gap-2"
              variant={'secondary'}
            >
              <Image
                src={quickSearchOption.imageUrl}
                width={16}
                height={16}
                alt={quickSearchOption.title}
              />
              {quickSearchOption.title}
            </Button>
          ))}
        </div>

        <div className="relative w-full h-[150px]">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="uppercase text-gray-400 font-bold text-xs">
            Agendamentos
          </h2>

          <BookingCard />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map(barbershop => (
              <BarbershopCard key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map(barbershop => (
              <BarbershopCard key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>

      <footer>
        <Card className="rounded-b-none px-5 py-6">
          <CardContent>
            <p className="text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
