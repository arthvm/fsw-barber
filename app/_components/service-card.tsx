'use client'

import { isPast, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { createBooking } from '../_actions/create-booking'
import { getBookings } from '../_actions/get-bookings'
import type {
  Barbershop,
  BarbershopService,
  Booking,
} from '../generated/prisma'
import { BookingSummary } from './booking-summary'
import { SignInDialog } from './signin-dialog'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Card, CardContent } from './ui/card'
import { Dialog, DialogContent } from './ui/dialog'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'

interface ServiceCardProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

function getTimeList({ bookings, selectedDay }: GetTimeListProps) {
  const timeList = TIME_LIST.filter(time => {
    const [hour, minute] = time.split(':')

    const hasTimePassed = isPast(
      set(selectedDay, { hours: Number(hour), minutes: Number(minute) })
    )

    if (hasTimePassed) {
      return false
    }

    const hasBookingOnTime = bookings.some(
      booking =>
        booking.date.getHours() === Number(hour) &&
        booking.date.getMinutes() === Number(minute)
    )

    if (hasBookingOnTime) {
      return false
    }

    return true
  })

  return timeList
}

export function ServiceCard({ service, barbershop }: ServiceCardProps) {
  const { data } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) {
      return
    }

    const [hour, minute] = selectedTime.split(':')
    return set(selectedDay, {
      hours: Number(hour),
      minutes: Number(minute),
    })
  }, [selectedDay, selectedTime])

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false)
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }

    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  useEffect(() => {
    if (!selectedDay) return

    const fetch = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  function handleDateSelect(date?: Date) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  function handleBookingClick() {
    if (data?.user) {
      return setIsBookingSheetOpen(true)
    }

    return setIsSignInDialogOpen(true)
  }

  function handleSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])

    setIsBookingSheetOpen(false)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDate) {
        return
      }

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleSheetOpenChange()

      toast.success('Reserva criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar reserva!')
    }
  }

  return (
    <>
      <Card className="p-0">
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">{service.name}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-primary">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={isBookingSheetOpen}
                onOpenChange={handleSheetOpenChange}
              >
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Separator />

                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />

                  {selectedDay && (
                    <>
                      <Separator />

                      <div className="flex overflow-x-auto gap-3 px-5 [&::-webkit-scrollbar]:hidden">
                        {timeList.length > 0 ? (
                          timeList.map(time => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? 'default' : 'outline'
                              }
                              className="rounded-full"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          ))
                        ) : (
                          <p className="text-xs">
                            Nao há horários disponíveis para esse dia
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {selectedDate && (
                    <>
                      <Separator />

                      <div className="px-5">
                        <BookingSummary
                          service={JSON.parse(JSON.stringify(service))}
                          barbershop={barbershop}
                          selectedDate={selectedDate}
                        />
                      </div>
                    </>
                  )}

                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDate}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isSignInDialogOpen}
        onOpenChange={open => setIsSignInDialogOpen(open)}
      >
        <DialogContent>
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
