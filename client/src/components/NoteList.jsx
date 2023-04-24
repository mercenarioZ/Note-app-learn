import { Box, Card, CardContent, Grid, List, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, Outlet, useParams, useLoaderData } from 'react-router-dom';

const NoteList = () => {
    const { noteId } = useParams();
    // console.log({ noteId });
    const { folder } = useLoaderData();
    console.log('[Note List]', {folder})
    // const folders = {
    //     notes: [
    //         { id: 445436, content: 'Note title a' },
    //         { id: 130502, content: 'Đi chơi Nha Trang' },
    //     ],
    // };
    const [activeNoteId, setActiveNoteId] = useState(noteId);

    return (
        <Grid container height='100%'>
            <Grid
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#f0ebe3',
                    padding: '8px',
                    maxWidth: 360,
                    textAlign: 'left',
                    overflowY: 'auto',
                }}
                item
                xs={4}
            >
                <List
                    subheader={
                        <Box>
                            <Typography
                                variant='h5'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Notes
                            </Typography>
                        </Box>
                    }
                >
                    {folder.notes.map(({ id, content }) => {
                        return (
                            <Link
                                key={id}
                                to={`note/${id}`}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setActiveNoteId(id)}
                            >
                                <Card
                                    sx={{
                                        mb: '5px',
                                        backgroundColor:
                                            id === activeNoteId
                                                ? 'rgb(145 255 210)'
                                                : null,
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            '&:last-child': { pb: '10px' },
                                            padding: '10px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: `${
                                                    content.substring(0, 30) ||
                                                    'Empty'
                                                }`,
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={8}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default NoteList;
