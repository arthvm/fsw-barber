import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { BarbershopCard } from './_components/barbershop-card'
import { BookingCard } from './_components/booking-card'
import { Header } from './_components/header'
import { Search } from './_components/search'
import { Button } from './_components/ui/button'
import { quickSearchOptions } from './_constants/search'
import { authOptions } from './_lib/auth'
import { db } from './_lib/prisma'

export default async function Home() {
  const data = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  const confirmedBookings = data?.user
    ? await db.booking.findMany({
        where: {
          userId: data.user.id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      })
    : []

  return (
    <div>
      <Header />

      <div className="p-5 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Ola, Arthur!</h2>
          <p>Sexta-feira, 25 de Abril</p>
        </div>

        <Search />

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button
              key={option.title}
              className="gap-2"
              variant={'secondary'}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
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

        {confirmedBookings.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="uppercase text-gray-400 font-bold text-xs">
              Agendamentos
            </h2>

            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

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
    </div>
  )
}
