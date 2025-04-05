import { useCreateUserMutation } from '@/services/api/user.api'
import Button from '@/shared/ui/button/button'
import Input from '@/shared/ui/input/input'
import AppLink from '@/shared/ui/link/app-link'
import Card from '@/shared/widgets/card/card'
import Form from '@/shared/widgets/form/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schema = z.object({
  username: z
    .string()
    .min(1, 'Имя пользователя обязательно')
    .max(100, 'Имя пользователя не может быть длиннее 100 символов'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов')
})

const Registration: FC = () => {
  const { mutateAsync: createUser, isPending } = useCreateUserMutation()

  const form = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit'
  })

  const { handleSubmit, setError } = form

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      const user = await createUser({
        body: data
      })

      toast(`${user.data.username}, добро пожаловать`)
    } catch (e) {
      console.error(e)
      const error = e as AxiosError<{ message: string }>

      if (
        error?.response?.data.message ===
        `Username: ${data.username} - already exists`
      ) {
        setError('username', { message: 'Пользователь уже существует' })
      }
    }
  })

  return (
    <Card>
      <Form form={form} onSubmit={handleFormSubmit}>
        <Form.Item name='username' label='Имя пользователя'>
          <Input type='text' placeholder='Введите имя пользователя' />
        </Form.Item>
        <Form.Item name='password' label='Пароль'>
          <Input type='password' placeholder='Введите пароль' />
        </Form.Item>
        <Button type='submit' disabled={isPending}>
          Зарегистрироваться
        </Button>
      </Form>
      <Card.Text>
        Есть учётная запись? <AppLink to='/sign-in'>Войти</AppLink>
      </Card.Text>
    </Card>
  )
}

export default Registration
