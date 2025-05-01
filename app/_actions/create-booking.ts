'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../_lib/prisma'

interface CreateBookingParams {
  date: Date
  userId: string
  serviceId: string
}

export async function createBooking(booking: CreateBookingParams) {
  await db.booking.create({
    data: booking,
  })

  revalidatePath('/barbershops/[id]')
}
