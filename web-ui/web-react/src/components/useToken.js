import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken?.token;
        }
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        let tokenJSON = {
            "token": userToken.token
        }
        localStorage.setItem('token', JSON.stringify(tokenJSON));
        setToken(tokenJSON);
    };

    return {
        setToken: saveToken,
        token
    }
}