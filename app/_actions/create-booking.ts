'use server'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

interface CreateBookingParams {
  date: Date
  serviceId: string
}

export async function createBooking(booking: CreateBookingParams) {
  const data = await getServerSession(authOptions)
  if (!data?.user) {
    throw new Error('User not logged in')
  }

  await db.booking.create({
    data: {
      ...booking,
      userId: data?.user.id,
    },
  })

  revalidatePath('/barbershops/[id]')
}
