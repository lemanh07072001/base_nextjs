"use client"
import {Button} from '@/components/ui/button'
import {Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator,} from '@/components/ui/field'
import {Input} from '@/components/ui/input'
import ButtonGoogle from "@/components/button-social/button-google";
import ButtonFacebook from "@/components/button-social/button-facebook";
import {useTranslations} from 'next-intl'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {signIn} from 'next-auth/react'
import {useRouter} from "next/navigation";

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<"div">) {
  const t = useTranslations('Auth.Login')
  const router = useRouter()


  const schema = yup.object({
    email: yup
      .string()
      .email(t('errors.email.invalid'))
      .required(t('errors.email.required')),
    password: yup
      .string()
      .min(8, t('errors.password.min'))
      .required(t('errors.password.required')),
  })

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<{
    email: string
    password: string
  }>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    })
    if (res?.error) {
      // Show a translated error, or integrate a toast
      alert(res.error)
      return
    }
    // Redirect on success if needed
    router.push('/dashboard')
  }
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <ButtonGoogle/>
          <ButtonFacebook/>
        </Field>
        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          {t('orContinueWith')}
        </FieldSeparator>
        <Field>
          <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            aria-invalid={!!errors.email}
            {...register('email')}
            required
          />
          {errors.email && (
            <FieldDescription className="text-destructive">
              {errors.email.message as string}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {t('forgotPassword')}
            </a>
          </div>
          <Input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            {...register('password')}
            required
          />
          {errors.password && (
            <FieldDescription className="text-destructive">
              {errors.password.message as string}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit" isLoading={isSubmitting} loadingText={t('submit')}>
            {t('submit')}
          </Button>
          <FieldDescription className="text-center">
            {t('noAccount')} <a href="#">{t('signup')}</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>

  )
}
