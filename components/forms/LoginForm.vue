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
        formData.append('username', values.username)
        formData.append('password', values.password)

        const {data, error} = await useFetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: formData,
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
                const { access_token, refresh_token, user } = data.value
                console.log('Access Token:', access_token)
                console.log('Refresh Token:', refresh_token)
                console.log('UserType ID:', user)
                useCookie('access_token').value = access_token
                useCookie('refresh_token').value = refresh_token
                useCookie('user').value = user
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
                <FormLabel>Usuario</FormLabel>
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