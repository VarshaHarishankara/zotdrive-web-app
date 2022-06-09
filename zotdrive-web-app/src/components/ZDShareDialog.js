import React, {useState, useEffect, useRef} from 'react';
import {Button, Grid,Snackbar} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {shareFile, unshareFile} from '../Manager/ZDDataManager'
import TextField from '@mui/material/TextField';
import {FormDialog,SharedPeopleView} from './styles';
import {Cancel, Link} from '@mui/icons-material';
import {getShareableLink} from '../Manager/ZDDataManager'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ZDShareDialog = (props) => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [emailId, setEmailId] = useState("");
    const sharedList = props.item.userList
    useEffect(() => {
        setOpen(props.isOpen);
    },[props.isOpen])

    const handleClose = () => {
        props.handleShareDialogClose(false)
        setOpen(false);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
          }
        setSnackbarOpen(false);
    };

    const handleCreateClick = () => {
        handleClose()
        if(emailId != "" && props.item){
            shareFile(emailId, props.item, () => {
                setEmailId("")
                props.shouldFetchData()
            },()=>{
                alert("Error! Could not share")
            })
        } 
    }

    const handleCancelClick = () => {
        handleClose()
        setEmailId("")
    }

    const handleEmailIdChange = (event) => {
        setEmailId(event.target.value);
    }

    const handleShareLinkClick = () => {
        setSnackbarOpen(true)
        handleClose()
        getShareableLink(props.item, (response) => {
            navigator.clipboard.writeText(response.data) 
        },() => {
            alert("Error! Could not fetch link")
        })
    }

    const handleEmailClick = (email) => {
        unshareFile(props.item, email, ()=>{
            handleClose()
            setEmailId("")
            props.shouldFetchData()
        },()=>{
            alert("Error! Could not unshare")
        })
    }

    return (
        <div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', height: '40%'} }}
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Share with people"}</DialogTitle>
            <DialogContent>
                <SharedPeopleView>
                    {sharedList && sharedList.length > 0 &&  <Grid container spacing={1}>
                        {
                            sharedList.map((object) => {
                                return(
                                    <Button style={{marginRight: '10px', marginBottom: '10px'}}color="inherit" key={object.user.email} variant="contained" endIcon={<Cancel />} onClick={() => handleEmailClick(object.user.email)}>
                                        {object.user.email}
                                    </Button>
                                )
                            })

                        }
                    </Grid>}
                </SharedPeopleView>
                <FormDialog>
                    <TextField
                        label="Add people"
                        margin="normal"
                        value={emailId}
                        onChange={handleEmailIdChange}
                    />
                </FormDialog>
            <Button onClick={handleShareLinkClick} startIcon={<Link/>}>Copy link</Button>   
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Link Copied"
            /> 
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleCreateClick}>Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
