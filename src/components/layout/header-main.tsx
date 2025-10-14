import {SidebarTrigger} from "@/components/ui/sidebar";
import {DarkMode} from "@/components/ui/dark-mode";
import {LanguageSwitcher} from "@/components/ui/language-switcher";


export function HeaderMain() {
  return (
    <header
      className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between w-full gap-2 px-4">
        <SidebarTrigger className="-ml-1"/>
        <div className='flex items-center gap-2'>
          <DarkMode/>
          <LanguageSwitcher/>
        </div>
      </div>
    </header>
  )
}