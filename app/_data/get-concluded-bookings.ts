'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export async function getConcludedBookings() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return await db.booking.findMany({
    where: {
      userId: session.user.id,
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
}
