import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { updateFile } from '../Manager/ZDDataManager';
import TextField from '@mui/material/TextField';
import {FormDialog} from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const ZDEditDialog = (props) => {
    const [filename, setFilename] = useState('')
    const [tags, setTags] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(props.isOpen);
    },[props.isOpen])

    const handleClose = () => {
        props.handleEditDialogClose(false)
        setOpen(false);
    };

    useEffect(() => {
        setFilename(props.item.name)
        setTags(props.item.tags)
    },[props])

    const handleFilenameChange = (event) => {
        if(event.target.value !== filename)
            setFilename(event.target.value)
    }

    const handleTagsChange = (event) => {
        if(event.target.value!== tags)
            setTags(event.target.value) 
    }

    const handleSaveClick = () => {
        handleClose()
        updateFile(filename, tags, props.item.objectid, () => {
            handleClose()
            setTags(props.item.tags)
            setFilename(props.item.name)
            props.shouldFetchData()
        },()=>{
            alert("Could not save the changes")
        })
    }

    const handleCancelClick = () => {
        handleClose()
        setTags(props.item.tags)
        setFilename(props.item.name)
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
            <DialogTitle>{"Edit"}</DialogTitle>
            <DialogContent>
                <FormDialog>
                    <TextField
                        label="File name"
                        margin="normal"
                        value={filename}
                        onChange={handleFilenameChange}
                    />
                    {!props.isFolder && <TextField
                        label="Tags"
                        margin="normal"
                        value={tags}
                        onChange={handleTagsChange}
                    />}
                </FormDialog>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleSaveClick}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}