import { Box, Card, CardContent, List, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NewFolder from './NewFolder';

const FolderList = ({ folders }) => {
    const { folderId } = useParams();
    console.log({ folderId });

    const [activeFolderId, setActiveFolderId] = useState(folderId);

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: '#7d9d9c',
                height: '100%',
                padding: '10px',
                textAlign: 'left',
                overflowY: 'auto',
            }}
            subheader={
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                        variant='h5'
                    >
                        Note Topic
                    </Typography>

                    <NewFolder />
                </Box>
            }
        >
            {folders.map(({ id, name }) => {
                return (
                    <Link
                        key={id}
                        to={`folders/${id}`}
                        style={{ textDecoration: 'none' }}
                        onClick={() => setActiveFolderId(id)}
                    >
                        <Card
                            sx={{
                                mb: '5px',
                                backgroundColor:
                                    id === activeFolderId
                                        ? 'rgb(255 211 150)'
                                        : null,
                            }}
                        >
                            <CardContent
                                sx={{
                                    '&:last-child': { pb: '10px' },
                                    padding: '10px',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                );
            })}
        </List>
    );
};

export default FolderList;
