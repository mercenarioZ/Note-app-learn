import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import { Container } from '@mui/system';
import './firebase/config';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Container maxWidth='lg' sx={{ marginTop: '20px', textAlign: 'center' }}>
        <RouterProvider router={router} />
    </Container>
);
