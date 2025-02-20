<script setup lang="ts">
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'


definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
});

const apiUrl = useRuntimeConfig().public.apiKey;
const accessToken = useCookie('access_token').value;

// Hacer la solicitud al endpoint /users
const {data: ships, error} = await useFetch(`${apiUrl}/api/ships`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}` // Enviar el token en el encabezado
    }
});

// Manejar errores
if (error.value) {
    console.error('Error fetching users:', error.value);
    // Puedes mostrar un mensaje de error al usuario si lo deseas
}

</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Table>
            <TableCaption>Lista Ships</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="">
                        #
                    </TableHead>
                    <TableHead class="">
                        affiliation
                    </TableHead>
                    <TableHead>category</TableHead>
                    <TableHead>manufacturer</TableHead>
                    <TableHead>model</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="invoice in ships" :key="invoice.id">
                    <TableCell class=" font-black">{{ invoice.id }}</TableCell>
                    <TableCell class="font-medium">
                        {{ invoice.affiliation }}
                    </TableCell>
                    <TableCell>{{ invoice.category }}</TableCell>
                    <TableCell>{{ invoice.manufacturer }}</TableCell>
                    <TableCell>{{ invoice.model }}</TableCell>

                </TableRow>
            </TableBody>
        </Table>
    </main>
</template>

<style scoped>

</style>