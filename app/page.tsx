import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { BarbershopCard } from './_components/barbershop-card'
import { Header } from './_components/header'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { Badge } from './_components/ui/badge'
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

          <Card className="p-0">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-3 pl-3">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage
                      src={
                        'https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png'
                      }
                    />
                  </Avatar>
                  <p className="text-sm">Barbearia FSW</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center px-5 border-l-2">
                <p className="text-sm">Abril</p>
                <p className="text-2xl">25</p>
                <p className="text-sm">17:30</p>
              </div>
            </CardContent>
          </Card>
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
