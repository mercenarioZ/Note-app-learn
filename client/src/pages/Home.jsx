import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import UserMenu from '../components/UserMenu';
import FolderList from '../components/FolderList';
import { Outlet, useLoaderData } from 'react-router-dom';

export default function Home() {
    const {folders} = useLoaderData()
    // console.log('[HomePage]', {folders})

    return (
        <>
            <Typography variant='h3' sx={{fontWeight: 'bold', mb: '20px' }}>
                NOTE APP
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'right', mb: '10px' }}>
                <UserMenu />
            </Box>

            <Grid
                container
                sx={{
                    height: '50vh',
                    boxShadow: '0 0 15px 0 rgb(190 190 190 / 60%)',
                }}
            >
                <Grid
                    item
                    xs={3}
                    sx={{
                        boxShadow: '0 0 15px 0 rgb(190 190 190 / 60%)',
                        height: '100%',
                    }}
                >
                    <FolderList
                        folders={folders}
                    ></FolderList>
                </Grid>
                <Grid item xs={9} sx={{ height: '100%' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}
