import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { graphQLRequest } from '../utils/request';

export default function Login() {
    const auth = getAuth();

    const { user } = useContext(AuthContext);

    // const navigate = useNavigate();

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        const { user: { uid, displayName } } = await signInWithPopup(auth, provider);
        const { data } = await graphQLRequest({
            query: `mutation register($uid: String!, $name: String!) {
            register(uid: $uid, name: $name) {
                uid
                name
            }
        }`,
            variables: {
                uid,
                name: displayName,
            },
        });
        console.log('register', { data });
    };

    if (user?.uid) {
        // navigate('/');

        // If don't use useEffect hook, avoid using useNavigate, use <Navigate /> component instead!
        return <Navigate to='/' /> 
    }

    return (
        <>
            <Typography variant='h4' sx={{ marginBottom: '10px' }}>
                This is login page
            </Typography>
            <Button onClick={handleLoginWithGoogle} variant='outlined'>
                Login with Google
            </Button>
        </>
    );
}
