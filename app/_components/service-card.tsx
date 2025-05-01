'use client'

import { format, set, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { createBooking } from '../_actions/create-booking'
import type { Barbershop, BarbershopService } from '../generated/prisma'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

export function ServiceCard({ service, barbershop }: ServiceCardProps) {
  const { data } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()

  function handleDateSelect(date?: Date) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) {
        return
      }

      const [hour, minute] = selectedTime.split(':')

      const bookingTime = set(selectedDay, {
        hours: Number(hour),
        minutes: Number(minute),
      })

      await createBooking({
        serviceId: service.id,
        userId: data?.user,
        date: bookingTime,
      })

      toast.success('Reserva criada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar reserva!')
    }
  }

  return (
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'secondary'} size={'sm'}>
                  Reservar
                </Button>
              </SheetTrigger>

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
                      {TIME_LIST.map(time => (
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
                      ))}
                    </div>
                  </>
                )}

                {selectedDay && selectedTime && (
                  <>
                    <Separator />

                    <div className="px-5">
                      <Card className="p-0">
                        <CardContent className="p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}

                <SheetFooter className="px-5">
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
