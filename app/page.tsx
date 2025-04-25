import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { Header } from './_components/header'
import { Avatar, AvatarImage } from './_components/ui/avatar'
import { Badge } from './_components/ui/badge'
import { Button } from './_components/ui/button'
import { Card, CardContent } from './_components/ui/card'
import { Input } from './_components/ui/input'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Ola, Arthur!</h2>
          <p>Sexta-feira, 25 de Abril</p>
        </div>

        <div className="flex items-center gap-2">
          <Input placeholder="Faca sua busca..." />
          <Button size={'icon'}>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative w-full h-[150px]">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <Card className="p-0">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={
                      'https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png'
                    }
                  />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2">
              <p className="text-sm">Abril</p>
              <p className="text-2xl">25</p>
              <p className="text-sm">17:30</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
