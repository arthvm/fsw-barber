import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SiderbarSheet } from './sidebar-sheet'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Sheet, SheetTrigger } from './ui/sheet'

export function Header() {
  return (
    <Card className="rounded-t-none">
      <CardContent className="flex flex-row items-center justify-between px-5">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size={'icon'} variant={'outline'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SiderbarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}
