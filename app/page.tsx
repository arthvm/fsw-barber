import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { Header } from './_components/header'
import { Button } from './_components/ui/button'
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
      </div>
    </div>
  )
}
