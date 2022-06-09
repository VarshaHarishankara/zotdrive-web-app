import React, {useState, useEffect, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {uploadFileToServer} from '../Manager/ZDDataManager'
import TextField from '@mui/material/TextField';
import {FormDialog} from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ZDFileDialog = (props) => {
    const fileInputRef = useRef();
    const [open, setOpen] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [tags, setTags] = useState("");

    useEffect(() => {
        setOpen(props.isOpen);
    },[props.isOpen])

    const handleClose = () => {
        props.handleDialogClose(false)
        setOpen(false);
    };

    const handleUploadClick = () => {
        handleClose()
        if(uploadFile != null){
            uploadFileToServer(uploadFile,tags, () => {
                fileInputRef.current.value = ""
                setUploadFile(null)
                setTags("")
                props.shouldFetchData()
            })
        } 
    }

    const handleCancelClick = () => {
        handleClose()
        setTags("")
        fileInputRef.current.value = ""
        setUploadFile(null)
    }

    const handleTagsChange = (event) => {
        console.log(event.target.value)
        setTags(event.target.value);
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
            <DialogTitle>{"Upload file"}</DialogTitle>
            <DialogContent>
                <FormDialog>
                    <input ref={fileInputRef} type="file" onChange={(e) => setUploadFile(e.target.files)} />
                    <TextField
                        label="Tags"
                        helperText="Please add tags to your file"
                        margin="normal"
                        value={tags}
                        onChange={handleTagsChange}
                    />
                </FormDialog>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleUploadClick}>Upload</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
