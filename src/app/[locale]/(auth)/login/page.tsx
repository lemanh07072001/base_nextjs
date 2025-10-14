import {LoginForm} from "@/views/Auth/LoginForm";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FieldDescription} from "@/components/ui/field";
import {getTranslations} from 'next-intl/server'

export default async function Login() {
  const t = await getTranslations('Auth.LoginPage')
  return (
    <div className={cn("flex flex-col gap-6")}> 
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t('tosNoticePrefix')} <a href="#">{t('termsOfService')}</a>{" "}
        {t('and')} <a href="#">{t('privacyPolicy')}</a>.
      </FieldDescription>
    </div>
  )
}