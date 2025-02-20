<script setup lang="ts">
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
});
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-icons/vue'
const apiUrl = useRuntimeConfig().public.apiKey;
</script>

<template>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 class="text-2xl font-bold">Documentación</h1>

        <section>
            <h2 class="text-lg">Api</h2>
            <Alert>
                <RocketIcon class="h-4 w-4" />
                <AlertTitle>Flask</AlertTitle>
                <AlertDescription>
                    La api fue desarrolada en Flask, puede acceder a su documentacion aqui
                    <a  :href="apiUrl" target="_blank">
                        @MyApi
                    </a>
                </AlertDescription>
            </Alert>
        </section>
        <section>
            <h2>
                Roles
            </h2>
            <Table>
                <TableCaption>Lista de roles sujeta a cambios</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">
                            Roles
                        </TableHead>
                        <TableHead>Descripcion</TableHead>
                        <TableHead>Vista</TableHead>
                        <TableHead>Clave</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell class="font-medium">
                            Admin
                        </TableCell>
                        <TableCell>Administrador  del sitio</TableCell>
                        <TableCell>Todas</TableCell>
                        <TableCell>["admin"]</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="font-medium">
                            Basico
                        </TableCell>
                        <TableCell>Mostrar lista de productos</TableCell>
                        <TableCell>Modelos</TableCell>
                        <TableCell>["basic"]</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="font-medium">
                            Recursos humanos
                        </TableCell>
                        <TableCell>Informacion sobre la app</TableCell>
                        <TableCell>Documentacion</TableCell>


                        <TableCell>["rh"]</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    </main>
</template>

<style scoped>

</style>