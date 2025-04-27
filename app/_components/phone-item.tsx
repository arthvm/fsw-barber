'use client'

import { SmartphoneIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from './ui/button'

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopy(phone: string) {
    navigator.clipboard.writeText(phone)
    toast.success('Telefone copiado com successo!')
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm ">{phone}</p>
      </div>

      <Button variant={'outline'} size={'sm'} onClick={() => handleCopy(phone)}>
        Copiar
      </Button>
    </div>
  )
}
