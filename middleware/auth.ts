// middleware/auth.js
export default function ({redirect}: { redirect: (path: string) => void }) {
    const accessToken = useCookie('access_token').value;
    const refreshToken = useCookie('refresh_token').value;
    const user = useCookie('user').value;

    if (!accessToken || !refreshToken || !user) {
        return navigateTo('/');
    }
}