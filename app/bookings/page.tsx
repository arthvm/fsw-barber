import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { BookingCard } from '../_components/booking-card'
import { Header } from '../_components/header'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export default async function BookingsPage() {
  const data = await getServerSession(authOptions)

  if (!data?.user) {
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: data?.user.id,
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: data?.user.id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />

      <div className="px-5 py-6 space-y-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}

        {concludedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
