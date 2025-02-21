<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import { Badge } from '@/components/ui/badge'
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
});
import { useApi } from '@/composables/useApi'
const apiUrl = useRuntimeConfig().public.apiKey;
const accessToken = useCookie('access_token').value;

// Hacer la solicitud al endpoint /users
const { data: users, error } = await useApi('/api/users', {
    method: 'GET',
});


// Manejar errores
if (error.value) {
    console.error('Error fetching users:', error.value);
    // Puedes mostrar un mensaje de error al usuario si lo deseas
}



/*
const { data: users, error } = await useAsyncData('users', async () => {
    const response = await $fetch('http://127.0.0.1:5000/api/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response;
});
*/

</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">

        <Card>
            <CardHeader>
                <CardTitle>Usuarios</CardTitle>
            </CardHeader>
            <CardContent class="grid gap-8">
                <!-- Iterar sobre los usuarios -->
                <div v-for="user in users" :key="user.id" class="flex items-center gap-4">
                    <Avatar class="hidden h-9 w-9 sm:flex">
                        <AvatarImage :alt="user.name" :src="user.avatar || '/avatars/default.png'"/>
                        <AvatarFallback>{{ user.name.charAt(0) }}</AvatarFallback>
                    </Avatar>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">
                            {{ user.name }}
                        </p>
                        <p class="text-sm text-muted-foreground">
                            {{ user.email }}
                        </p>
                    </div>
                    <div class="ml-auto font-medium">
                        <Badge :class="{'bg-blue-500': user.roles[0] === 'basic', 'bg-green-500': user.roles[0] === 'admin', 'bg-pink-500': user.roles[0] === 'rh'}">
                            {{ user.roles[0] }}
                        </Badge>

                    </div>
                </div>
            </CardContent>
        </Card>
    </main>
</template>

<style scoped>

</style>