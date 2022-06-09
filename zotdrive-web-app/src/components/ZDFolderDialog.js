import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {createFolder} from '../Manager/ZDDataManager'
import TextField from '@mui/material/TextField';
import {FormDialog} from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ZDFolderDialog = (props) => {
    const fileInputRef = useRef();
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");

    useEffect(() => {
        setOpen(props.isOpen);
    },[props.isOpen])

    const handleClose = () => {
        props.handleDialogClose(false)
        setOpen(false);
    };

    const handleCreateClick = () => {
        handleClose()
        if(folderName != ""){
            createFolder(folderName, () => {
                setFolderName("")
                props.shouldFetchData()
            },()=>{
                alert("Error! Could not create folder")
            })
        } 
    }

    const handleCancelClick = () => {
        handleClose()
        setFolderName("")
    }

    const handleFolderNameChange = (event) => {
        setFolderName(event.target.value);
    }

    return (
        <div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Enter folder name"}</DialogTitle>
            <DialogContent>
                <FormDialog>
                    <TextField
                        label="Folder name"
                        margin="normal"
                        value={folderName}
                        onChange={handleFolderNameChange}
                    />
                </FormDialog>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleCreateClick}>Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
