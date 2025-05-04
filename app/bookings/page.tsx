import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { BookingCard } from '../_components/booking-card'
import { Header } from '../_components/header'
import { getConcludedBookings } from '../_data/get-concluded-bookings'
import { getConfirmedBookings } from '../_data/get-confirmed-bookings'
import { authOptions } from '../_lib/auth'

export default async function BookingsPage() {
  const data = await getServerSession(authOptions)

  if (!data?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()

  const concludedBookings = await getConcludedBookings()
  return (
    <>
      <Header />

      <div className="px-5 py-6 space-y-6">
        <h1 className="font-bold text-xl">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

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
