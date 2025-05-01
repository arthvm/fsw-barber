import { BarbershopCard } from '../_components/barbershop-card'
import { Header } from '../_components/header'
import { Search } from '../_components/search'
import { db } from '../_lib/prisma'

interface BarbershopsPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const { search } = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return (
    <div className="space-y-6">
      <Header />

      <div className="space-y-6 px-5">
        <Search />

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Resultados para "{search}"
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
