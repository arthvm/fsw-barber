import { BarbershopCard } from '../_components/barbershop-card'
import { Header } from '../_components/header'
import { Search } from '../_components/search'
import { db } from '../_lib/prisma'

interface BarbershopsPageProps {
  searchParams: Promise<{
    name?: string
    service?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const { name, service } = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      AND: [
        name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div className="space-y-6">
      <Header />

      <div className="space-y-6 px-5">
        <Search />

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Resultados para "{name || service}"
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {barbershops.map(barbershop => (
              <BarbershopCard key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
