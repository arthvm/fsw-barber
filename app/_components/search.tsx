'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'Digite algo para buscar',
  }),
})

type SearchSchema = z.infer<typeof formSchema>

export function Search() {
  const form = useForm<SearchSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const searchParams = useSearchParams()
  const serviceFilter = searchParams.get('service')

  const router = useRouter()

  function handleSubmit(data: SearchSchema) {
    router.push(
      `/barbershops?name=${data.name}${serviceFilter ? `&service=${serviceFilter}` : ''}`
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input {...field} placeholder="Faça sua busca..." />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={'icon'} type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
  )
}
