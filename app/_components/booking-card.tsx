import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

// TODO: add dynamic behavior
export function BookingCard() {
  return (
    <Card className="p-0">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-3 pl-3">
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
  )
}
