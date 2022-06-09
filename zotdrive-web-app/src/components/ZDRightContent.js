import React, {useEffect, useState} from 'react';
import {ClearView,DetailsView,DetailRowView,FileOptionsView,RightContentView,RightLabelView,RightContentDefaultView, RestoreView, FileIconView} from './styles';
import {Button, ListItemText, ListItemIcon, Menu,MenuItem, Typography} from '@mui/material';
import {Clear, Delete, Download, Edit, Folder, MoreHoriz, Share, Send, Info} from '@mui/icons-material';
import {deleteFile,downloadFile, openFile, fetchFileNames, restoreFile} from '../Manager/ZDDataManager'
import { ZDEditDialog } from './ZDEditDialog';
import { ZDShareDialog } from './ZDShareDialog';
import files from '../assets/files.png'
import { ZDFileTypeIcon } from './ZDFileTypeIcon';
import { ZDSharedDetailsDialog } from './ZDSharedDetailsDialog';

export const ZDRightContent = (props) => {
    const [data, setData] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [sharedWithDialogOpen, setSharedWithDialogOpen] = useState(false)
    
    useEffect(() => {
        setData(props.item) 
    },[props])

    const handleMoreOptions = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      }
    const handleDownloadClose = () => {
        setAnchorEl(null);
        downloadFile(data.objectid,(response)=>{
            const blob = new Blob([response.data])
            const filename =  response.headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '')
            const url = window.URL.createObjectURL(blob); 
            const a = document.createElement('a');
            a.href = url;
            a.download = filename
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
        },()=>{
            alert("Error! Unable to download")
        })
    };

    const handleOpenFile = (data) => {
        setAnchorEl(null);
        openFile(data.objectid,(response)=>{
            let blobType = ""
            if(data.type == "PNG" || data.type == "JPG" || data.type == "JPEG"){
                blobType = "image/*"
            }else{
                blobType = "application/pdf"
            }
            const blob = new Blob([response.data], { type: blobType })
            const filename =  response.headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '')
            const url = window.URL.createObjectURL(blob); 
            const pdfWindow = window.open();
            pdfWindow.location.href = url;   
           
        },()=>{
            alert("Error! Unable to download")
        })
    };

    const handleUpdateData = () => {
        fetchData()
    }

    const handleEditClose = () => {
        handleClose()
        setEditDialogOpen(true)
    }

    const handleShareClose = () =>{
        handleClose()
        setShareDialogOpen(true)
    }

    const handleMoreDetailsClose = () => {
        handleClose()
        setSharedWithDialogOpen(true)
    }

    const handleDeleteClose = () => {
        setAnchorEl(null);
        deleteFile(data.objectid,(response) => {
            fetchData()
        },() => {
            alert("Error! Unable to delete")
        })
    };


    const fetchData = () => {
        fetchFileNames((result) => {
            props.updatedData(result)
        })
    }

    const handleRestore = () => {
        restoreFile(data, ()=> {
            props.updateOption()
            fetchData()
        },()=>{
            alert("Error! Could not restore")
        })
    }

    const fileDetails = () => {
        return(
            <DetailsView>
                <RightLabelView style={{marginRight: "20px"}}>
                    {detailsRow("Type", "#696969")}  
                    {data.type != null &&  detailsRow("Size", "#696969")}  
                    { data.type != null && detailsRow("Tags", "#696969")}    
                    {data.deleted ?  detailsRow("Deleted", "#696969") : detailsRow("Created", "#696969")}  
                </RightLabelView>
                <RightLabelView>
                    {detailsRow(data.type == null ? "Folder" : data.type)}     
                    {data.type != null && detailsRow(formatBytes(data.size))}     
                    {data.type != null && detailsRow(data.tags ? data.tags : '-')}    
                    {data.deleted ?  detailsRow(data.deletedAt) : detailsRow(data.createdOn)}  
                </RightLabelView>  
            </DetailsView>
        )
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const detailsRow = (text, textColor) => {
        return(
            <DetailRowView>
                <Typography variant="h7" component="div" color={textColor}>
                    {text}
                </Typography>  
            </DetailRowView>
        )
    }

    const restoreFileView = () => {
        return (
            <RestoreView>
                <Button variant="outlined" color="inherit" onClick={handleRestore}>{"Restore"}</Button>
            </RestoreView>
        )
    }

    const fileOptionsView = () => {
        return(
            <FileOptionsView>
                <Button variant="outlined" color="inherit" onClick={() => handleOpenFile(data)}>{data.folder ? "Open Folder" : "Open File"}</Button>
                <Button 
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"  
                color="inherit" 
                startIcon={<MoreHoriz/>}
                onClick={handleMoreOptions}
                ></Button>
                 <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                >
                    <MenuItem onClick={handleEditClose}>
                        <ListItemIcon>
                            <Edit fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>              
                    </MenuItem>
                    {!props.isSharedTab ? <MenuItem onClick={handleShareClose}>
                        <ListItemIcon>
                            <Share fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Share</ListItemText>              
                    </MenuItem> : 
                         <MenuItem onClick={handleMoreDetailsClose}>
                         <ListItemIcon>
                             <Info fontSize="small" />
                         </ListItemIcon>
                         <ListItemText>More Details</ListItemText>              
                     </MenuItem>
                    }
                    <MenuItem onClick={handleDeleteClose}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>              
                    </MenuItem>
                    {!data.folder && <MenuItem onClick={() => handleDownloadClose()}>
                        <ListItemIcon>
                            <Download fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Download</ListItemText>              
                    </MenuItem>}
                </Menu>                   
            </FileOptionsView>
        )
    }

    const renderEditDialog = () => {
        return(
            <ZDEditDialog isFolder={data.folder} isOpen={editDialogOpen} item={data} shouldFetchData={handleUpdateData} handleEditDialogClose={() => setEditDialogOpen(false)}/>
        )
    }

    const renderShareDialog = () => {
        return(
            <ZDShareDialog isOpen={shareDialogOpen} item={data} shouldFetchData={handleUpdateData} handleShareDialogClose={() => setShareDialogOpen(false)}/>
        )
    }

    const renderSharedWithDialog = () => {
        return(
            <ZDSharedDetailsDialog isOpen={sharedWithDialogOpen} item={data} handleShareDialogClose={() => setSharedWithDialogOpen(false)}/>
        )
    }

    const handleClearClick = () => {
        setData(null)
    }

    const renderFileIcon = () => {
        
        const icon = data.folder ? 
                <Folder style={{fontSize: "120px", color: '#929292',marginLeft: '20px'}}/>  : 
                <ZDFileTypeIcon fileType={data.type} iconWidth={'80px'} iconHeight={'100px'}/>
            
        return icon
        
    }

    return(
        data ? 
        <RightContentView>
            <ClearView>
                 <Button color="inherit" onClick={handleClearClick}><Clear style={{marginRight: '10px'}}/></Button>
            </ClearView>
            <Typography variant="h5" component="div" style={{wordBreak: 'break-word', margin: '20px'}}>
                    {data ? data.name : ""}
            </Typography> 
            {renderFileIcon()}
            {fileDetails()}
            {data.deleted ? restoreFileView() : fileOptionsView()}
            {renderEditDialog()}
            {renderShareDialog()}
            {renderSharedWithDialog()}
        </RightContentView>
        :
        <RightContentDefaultView>
            <img src={files} width="100" height="100"/>
            <Typography variant="h5" component="div" color={'#696969'} style={{wordBreak: 'break-word', margin: '20px'}}>
                {"Select file or folder to see details"}
            </Typography> 
        </RightContentDefaultView>
    )
}