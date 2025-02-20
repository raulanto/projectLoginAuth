<script setup lang="ts">

</script>

<template>

    <div class="w-full h-screen lg:grid  lg:grid-cols-2">
        <div class="flex items-center justify-center py-12">
            <!-- Fondo cuadriculado -->
            <div class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            </div>
            <div
                class="absolute top-0 z-[-2] h-screen w-screen dark:bg-[radial-gradient(#ffffff33_1px,#1C1917_1px)] dark:bg-[size:20px_20px]">
            </div>
            <div class="mx-auto grid w-[350px] gap-6">
                <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-bold">
                        Inicio
                    </h1>
                    <p class="text-balance text-muted-foreground">
                        Ingrese su nombre de usuario y contraseña a continuación para iniciar sesión en su cuenta
                    </p>
                </div>
                <div class="grid gap-4">
                    <slot></slot>
                </div>
                <div class="mt-4 text-center text-sm">
                    Quiere crear una cuenta?
                    <a href="#" class="underline">
                        Registrarse
                    </a>
                </div>
            </div>
        </div>
        <div class="hidden bg-muted lg:block max-h-screen">
            <img
                src="https://images.pexels.com/photos/5286712/pexels-photo-5286712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Image"
                width="1920"
                height="1080"
                class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            >
        </div>
    </div>
</template>

<style scoped>

</style>