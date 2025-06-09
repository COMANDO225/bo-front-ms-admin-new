import { Outlet, useMatches } from '@tanstack/react-router'
import { AppSidebar } from '@/shared/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/shared/components/ui/breadcrumb';
import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';

export interface RouteMeta {
    title?: string
    breadcrumb?: string
}

export function DashboardLayout() {
    const matches = useMatches()

    const breadcrumbs = matches
        .filter((match) => (match.staticData as RouteMeta)?.breadcrumb || match.pathname !== '/')
        .map((match, index, array) => {
            const isLast = index === array.length - 1
            const breadcrumbText = (match.staticData as RouteMeta)?.breadcrumb ||
                match.pathname.split('/dashboard').filter(Boolean).pop() ||
                'Home'

            return {
                label: breadcrumbText,
                href: match.pathname,
                isLast,
            }
        })

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="bg-white dark:bg-gray-800 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, index) => (
                                    <BreadcrumbItem key={crumb.href}>
                                        {crumb.isLast ? (
                                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                        ) : (
                                            <>
                                                <BreadcrumbLink href={crumb.href}>
                                                    {crumb.label}
                                                </BreadcrumbLink>
                                                {index < breadcrumbs.length - 1 && (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </>
                                        )}
                                    </BreadcrumbItem>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <section className="p-4">
                    {<Outlet />}
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}