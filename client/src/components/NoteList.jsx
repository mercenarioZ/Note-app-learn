import { NoteAddOutlined } from '@mui/icons-material';
import {
    Box,
    Card,
    CardContent,
    Grid,
    IconButton,
    List,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    Link,
    Outlet,
    useParams,
    useLoaderData,
    useSubmit,
    useNavigate
} from 'react-router-dom';

const NoteList = () => {
    const { noteId, folderId } = useParams();
    const { folder } = useLoaderData();
    const [activeNoteId, setActiveNoteId] = useState(noteId);
    const submit = useSubmit();
    const navigate = useNavigate();

    const handleAddNewNote = () => {
        submit(
            {
                content: '',
                folderId,
            },

            {
                method: 'post',
                action: `/folders/${folderId}`,
            }
        );
    };

    useEffect(() => {
        if (noteId) {
            setActiveNoteId(noteId);
            return;
        }

        // Logic if folder has at least 1 note
        if (folder?.notes?.[0]) { 
            navigate(`note/${folder.notes[0].id}`) // Navigate to the first note of list
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId, folder.notes]);

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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Notes
                            </Typography>
                            <Tooltip
                                title='Add note'
                                onClick={handleAddNewNote}
                            >
                                <IconButton>
                                    <NoteAddOutlined />
                                </IconButton>
                            </Tooltip>
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
                                                    'Untitled'
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
