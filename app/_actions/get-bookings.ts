'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { db } from '../_lib/prisma'

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export async function getBookings({ serviceId, date }: GetBookingsProps) {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
      serviceId: serviceId,
    },
  })

  return bookings
}
