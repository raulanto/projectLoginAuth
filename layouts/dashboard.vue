<script lang="ts" setup>
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from '@/components/ui/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Separator} from '@/components/ui/separator'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import {
    BadgeCheck,
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    GalleryVerticalEnd,
    LogOut,
    SquareTerminal,
} from 'lucide-vue-next'
import {computed, ref} from 'vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import type UserType from '@/types/UserType'
import {useToast} from '@/components/ui/toast/use-toast'


const user = useCookie('user').value as UserType | null;

const data = {
    user: {
        name: user.name,
        email: user.email,
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Sistema',
            logo: GalleryVerticalEnd,
            plan: user.roles[0],
        }
    ],
    navMain: [
        {
            title: 'Usuarios',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'Lista de Usuarios',
                    url: '/admin/ListaUsuarios',
                },
            ],
            roles: ['admin'] // Solo el rol 'admin' puede ver esto
        },
        {
            title: 'Modelos',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Ships',
                    url: '/modelos/ListaShips',
                },
            ],
            roles: ['admin', 'basic'] // Los roles 'admin' y 'basic' pueden ver esto
        },
        {
            title: 'Documentacion',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Introducción',
                    url: '/documentacion/',
                },
            ],
            roles: ['admin', 'rh'] // Los roles 'admin' y 'rh' pueden ver esto
        },
    ],
}

// Función para filtrar los elementos del menú según los roles del usuario
const filteredNavMain = computed(() => {
    return data.navMain.filter(item => {
        return item.roles.some(role => user.roles.includes(role));
    });
});

const breadcrumbLinks = ref([
    {label: 'Dashboard', url: '/dashboard/'}
])

const activeTeam = ref(data.teams[0])

function setActiveTeam(team: typeof data.teams[number]) {
    activeTeam.value = team
}

const apiUrl = useRuntimeConfig().public.apiKey;
const {toast} = useToast()

const logout = async () => {
    try {
        // Obtener el token de acceso de las cookies
        const accessToken = useCookie('access_token').value;

        // Verificar si hay un token de acceso
        if (!accessToken) {
            console.error('No access token found.');
            return;
        }

        // Hacer la solicitud DELETE al endpoint de logout
        const {error} = await useFetch(`${apiUrl}/auth/logout`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}` // Enviar el token en el encabezado
            }
        });

        // Manejar errores
        if (error.value) {
            console.error('Error during logout:', error.value);
            toast({
                title: 'Error',
                description: 'Error al cerrar sesión. Por favor, inténtelo de nuevo.',
            });
            return;
        }

        // Limpiar las cookies
        useCookie('access_token').value = null;
        useCookie('refresh_token').value = null;
        useCookie('user').value = null;

        // Redirigir al usuario a la página de inicio de sesión
        navigateTo('/');

        // Mostrar un mensaje de éxito
        toast({
            title: 'Éxito',
            description: 'Cierre de sesión exitoso.',
        });

    } catch (err) {
        console.error('Unexpected error during logout:', err);
        toast({
            title: 'Error',
            description: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.',
        });
    }
};


</script>

<template>
    <Toaster />
    <SidebarProvider>
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                    size="lg"
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <component :is="activeTeam.logo" class="size-4" />
                                    </div>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ activeTeam.name }}</span>
                                        <span class="truncate text-xs">{{ activeTeam.plan }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible
                            v-for="item in filteredNavMain"
                            :key="item.title"
                            as-child
                            :default-open="item.isActive"
                            class="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger as-child>
                                    <SidebarMenuButton :tooltip="item.title">
                                        <component :is="item.icon" />
                                        <span>{{ item.title }}</span>
                                        <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem
                                            v-for="subItem in item.items"
                                            :key="subItem.title"
                                        >
                                            <SidebarMenuSubButton as-child>
                                                <a :href="subItem.url">
                                                    <span>{{ subItem.title }}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <SidebarMenuButton
                                    size="lg"
                                    class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar class="h-8 w-8 rounded-lg">
                                        <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                                        <AvatarFallback class="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div class="grid flex-1 text-left text-sm leading-tight">
                                        <span class="truncate font-semibold">{{ data.user.name }}</span>
                                        <span class="truncate text-xs">{{ data.user.email }}</span>
                                    </div>
                                    <ChevronsUpDown class="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                                <DropdownMenuLabel class="p-0 font-normal">
                                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar class="h-8 w-8 rounded-lg">
                                            <AvatarImage :src="data.user.avatar" :alt="data.user.name" />
                                            <AvatarFallback class="rounded-lg">
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div class="grid flex-1 text-left text-sm leading-tight">
                                            <span class="truncate font-semibold">{{ data.user.name }}</span>
                                            <span class="truncate text-xs">{{ data.user.email }}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck />
                                        Cuenta
                                    </DropdownMenuItem>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="logout">
                                    <LogOut />
                                    Salir
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
        <SidebarInset>
            <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                    <Separator orientation="vertical" class="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbSeparator class="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbLink :href="breadcrumbLinks[0].url">{{
                                        breadcrumbLinks[0].label
                                    }}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main>
                <slot/>
            </main>
        </SidebarInset>
    </SidebarProvider>
</template>