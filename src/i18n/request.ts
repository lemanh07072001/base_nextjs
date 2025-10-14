import {getRequestConfig} from 'next-intl/server';
import {routing} from "@/i18n/routing";
import {hasLocale} from "use-intl";

export default getRequestConfig(async ({requestLocale}) => {
  // ✅ Nếu locale không tồn tại, fallback sang 'vi'
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});