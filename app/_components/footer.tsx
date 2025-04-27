import { Card, CardContent } from './ui/card'

export function Footer() {
  return (
    <footer>
      <Card className="rounded-b-none px-5 py-6">
        <CardContent>
          <p className="text-sm text-gray-400">
            © 2023 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
