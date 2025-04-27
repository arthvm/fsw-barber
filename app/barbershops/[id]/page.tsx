import { PhoneItem } from '@/app/_components/phone-item'
import { ServiceCard } from '@/app/_components/service-card'
import { Button } from '@/app/_components/ui/button'
import { db } from '@/app/_lib/prisma'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BarbershopPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const { id: shopId } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: shopId,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    notFound()
  }

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop.imageUrl}
          fill
          className="object-cover"
          alt={barbershop.name}
        />

        <Button
          asChild
          size={'icon'}
          variant={'secondary'}
          className="absolute top-4 left-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          asChild
          size={'icon'}
          variant={'secondary'}
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="space-y-3 p-5 border-b">
        <h1 className="font-bold text-xl">{barbershop?.name}</h1>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop?.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="text-primary fill-primary" size={18} />
            <p className="text-sm">5.0 (499 avaliações)</p>
          </div>
        </div>
      </div>

      <div className="p-5 border-b space-y-3">
        <h2 className="text-bold uppercase text-gray-400 text-xs">Sobre Nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>

      <div className="p-5 border-b space-y-3">
        <h2 className="text-bold uppercase text-gray-400 text-xs">Serviços</h2>
        {barbershop.services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-bold uppercase text-gray-400 text-xs">Contato</h2>
        {barbershop.phones.map(phone => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  )
}
