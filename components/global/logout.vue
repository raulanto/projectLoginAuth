<script lang="ts" setup>
import {Button} from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'


import { useToast } from '@/components/ui/toast/use-toast'
const apiUrl = useRuntimeConfig().public.apiKey;
const { toast } = useToast()

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
        const { error } = await useFetch(`${apiUrl}/auth/logout`, {
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
                description: 'Failed to log out. Please try again.',
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
            title: 'Success',
            description: 'Successfully logged out.',
        });

    } catch (err) {
        console.error('Unexpected error during logout:', err);
        toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
        });
    }
};



</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">
                Dialog with toast
            </Button>
        </DialogTrigger>
        <DialogContent
            class="sm:max-w-md"
            @interact-outside="event => {
        const target = event.target as HTMLElement;
        if (target?.closest('[data-sonner-toaster]')) return event.preventDefault()
      }"
        >
            <DialogHeader>
                <DialogTitle>Cerra Seccion</DialogTitle>
                <DialogDescription> Seguro que quiere Salir?</DialogDescription>
            </DialogHeader>
            <div class="grid gap-4">
                <Button
                    class="px-3"
                    size="sm"
                >
                    Salir
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>