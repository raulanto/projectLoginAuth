<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/toast/use-toast'
import {Input} from '@/components/ui/input'
import {useForm} from 'vee-validate'
import {formSchema} from "~/components/forms/formshema";

const apiUrl = useRuntimeConfig().public.apiKey;

const {isFieldDirty, handleSubmit} = useForm({
    validationSchema: formSchema,
})
const { toast } = useToast()
const onSubmit = handleSubmit(async (values) => {
    try {
        const formData = new FormData()
        formData.append('username', values.username) // Asegúrate de que el nombre del campo sea 'username'
        formData.append('password', values.password) // Asegúrate de que el nombre del campo sea 'password'

        const {data, error} = await useFetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: formData, // Envía los datos como FormData
        })

        if (error.value) {
            if (error.value.status === 401) {
                toast({
                    title: 'Error',
                    description: error.value.data.message,
                });
            } else {
                console.log('Error during login:', error.value);
                toast({
                    title: 'Error',
                    description: error.value.data.message,
                });
            }
        } else {
            if (data.value) {
                //@ts-ignore
                const { access_token, refresh_token, user } = data.value
                console.log('Access Token:', access_token)
                console.log('Refresh Token:', refresh_token)
                console.log('User ID:', user)


                // Almacenar el token en el almacenamiento local o en una cookie
                useCookie('access_token').value = access_token
                useCookie('refresh_token').value = refresh_token
                useCookie('user').value = user

                // Redirigir al usuario
                navigateTo('/dashboard')
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err)
    }
})
</script>

<template>
    <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
            <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Usuario" v-bind="componentField"/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Contraseña" v-bind="componentField"/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        </FormField>
        <Button type="submit" class="w-full">
            Entrar
        </Button>
    </form>
</template>