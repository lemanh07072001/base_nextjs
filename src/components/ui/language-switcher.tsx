'use client'
import {usePathname, useRouter} from 'next/navigation'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useLocale} from "use-intl";

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale();


  const changeLocale = (newLocale: string) => {
    if (!pathname) return
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className='w-[36px] h-[36px]'>
          {locale?.toUpperCase() || 'VI'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale('vi')}
                          className={locale === 'vi' ? 'opacity-100' : 'opacity-50'}>
          VI
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale('en')}
                          className={locale === 'en' ? 'opacity-100' : 'opacity-50'}>
          EN
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}