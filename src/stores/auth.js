import {defineStore} from 'pinia'
import { ref } from 'vue'
import http from '@/services/http'

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    async function checkToken() {
        try {
            const tokenAuth = 'Bearer ' + token.value;
            const {data} = await http.get('login/verifica', {
                headers: {
                    Authorization: tokenAuth
                }
            });
            return true;

        } catch (error) {
            console.log(error.response.data);
            return false;
        }
    }

    return {
        token,
        setToken,
        checkToken
    }
})