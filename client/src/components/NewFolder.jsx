import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { addNewFolder } from '../utils/folderUtils';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function NewFolder() {
    const navigate = useNavigate();

    const [newFolderName, setNewFolderName] = useState('');
    const [open, setOpen] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    
    const popupName = searchParams.get('popup');

    const handleOpenPopup = () => {
        // setOpen(true);
        setSearchParams({ popup: 'add-folder' });
    };

    const handleClosePopup = () => {
        setOpen(false);
        setNewFolderName('');
        // setSearchParams({popup: ''})
        navigate(-1)
    };

    const handleAddNewFolder = async () => {
        const { addFolder } = await addNewFolder({ name: newFolderName });
        console.log({ addFolder });

        handleClosePopup(); // Close the popup when folder has been created
    };

    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpen(true);
            return;
        }

        setOpen(false);
    }, [popupName]);

    return (
        <div>
            <Tooltip title='Add a new folder' onClick={handleOpenPopup}>
                <IconButton size='small'>
                    <AddCircleOutline sx={{ color: 'white' }} />
                    {/* <CreateNewFolderOutlined sx={{ color: 'white' }} /> */}
                </IconButton>
            </Tooltip>

            {/* Create popup */}
            <Dialog open={open} onClose={handleClosePopup}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Folder name'
                        size='small'
                        variant='standard'
                        autoComplete='off'
                        sx={{ width: '400px' }}
                        onChange={handleNewFolderNameChange}
                        value={newFolderName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
