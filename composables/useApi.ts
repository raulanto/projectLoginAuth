export function useApi<T>(url: string, options: any = {}) {
    const config = useRuntimeConfig();
    const accessToken = useCookie('access_token');
    const refreshToken = useCookie('refresh_token');
    const user = useCookie('user');

    // Agregar token de acceso a la cabecera
    options.headers = {
        ...options.headers,
        Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    };

    return useFetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
        async onResponseError({ response }) {
            if (response.status === 401 && refreshToken.value) {
                try {
                    // Intentar renovar el token
                    const { data: newTokens } = await useFetch('/auth/refresh', {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${refreshToken.value}` },
                        baseURL: config.public.apiBase,
                    });

                    if (!newTokens.value) {
                        throw new Error('No se pudo refrescar el token');
                    }

                    // Guardar nuevos tokens
                    accessToken.value = newTokens.value.access_token;
                    refreshToken.value = newTokens.value.refresh_token;

                    // Reintentar la solicitud original con el nuevo token
                    return useFetch<T>(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${newTokens.value.access_token}`,
                        },
                    });
                } catch (error) {
                    console.error('Error al refrescar el token:', error);
                    accessToken.value = null;
                    refreshToken.value = null;
                    user.value = null;
                    return navigateTo('/');
                }
            }
        },
    });
}
