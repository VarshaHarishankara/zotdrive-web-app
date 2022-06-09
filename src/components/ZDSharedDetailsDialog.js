import React, {useState, useEffect, useRef} from 'react';
import {Button, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {SharedPeopleView} from './styles';
import {getSharedWithList} from '../Manager/ZDDataUtils'
import {Link} from '@mui/icons-material';
import {getShareableLink} from '../Manager/ZDDataManager'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ZDSharedDetailsDialog = (props) => {
    const [open, setOpen] = useState(false);
    const sharedList = getSharedWithList(props.item)
    const emailId = localStorage.getItem("emailId")

    useEffect(() => {
        setOpen(props.isOpen);
    },[props.isOpen])

    const handleClose = () => {
        props.handleShareDialogClose(false)
        setOpen(false);
    };

    const handleShareLinkClick = () => {
        handleClose()
        getShareableLink(props.item, (link) => {
            console.log(link)
        },() => {
            alert("Error! Could not fetch link")
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
            <DialogTitle>{"Shared with :"}</DialogTitle>
            <DialogContent>
                <SharedPeopleView>
                    {sharedList && sharedList.length > 0 &&  <Grid container spacing={1}>
                        {
                            sharedList.map((object) => {
                                const button = object.email != emailId ? <Button key={object.email} style={{marginRight: '10px', marginBottom: '10px'}}color="inherit" key={object.email} variant="contained">
                                {object.email}
                            </Button> :<div></div>
                                return(
                                    button
                                )
                            })

                        }
                    </Grid>}
                </SharedPeopleView>
            <Button onClick={handleShareLinkClick} startIcon={<Link/>}>Copy link</Button>    
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
