import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import { ZDSearchBar } from './ZDSearchBar';
import {ZDProfile} from './ZDProfile';
import {ContentView,DisplayOptionsView, DropDownView, GridListOptions, MainContentView, NoFileView, FilesAndDetailsView,FilesView, PathItem, PathView}  from './styles';
import {Button, Grid, IconButton} from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import {ZDFileItem} from '../components/ZDFileItem';
import { ZDRightContent } from './ZDRightContent';
import { COLORS } from '../theme/colors';
import {ZDFolderItem} from './ZDFolderItem';
import {fetchFileNames} from '../Manager/ZDDataManager'
import { addPath, getPath, popPath } from '../Manager/ZDDataUtils';
import MenuItem from '@mui/material/MenuItem';
import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { ZDFileTypeIcon } from './ZDFileTypeIcon';
import {FormatListBulleted, GridView} from '@mui/icons-material';
import NoFilesIcon from '../assets/NoFilesIcon.jpeg'

export function ZDMainContent(props){
    const [selectedItem, setSelectedItem] = useState(null);
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const username = localStorage.getItem("emailId");
    const [dropDownOption, setDropDownOption] = useState(10)
    const [isListview, setIsListView] = useState(false)

    useEffect(() => {
        setFiles(props.results.files)
        setFolders(props.results.folders)
        setDropDownOption(props.option)
    },[props])

    const handleUpdateData = (response) => {
        setSelectedItem(null)
        setFiles(response.files)
        setFolders(response.folders)
    }

    const handleOnClick = (file) => {
        setSelectedItem(file)
    }

    const handleDoubleClick = (folder) => {
        addPath(folder)
        fetchFileNames((response) =>{
            handleUpdateData(response)
        })
    }

    const handlePathClick = (obj, index) => {
        popPath(index+1)
        fetchFileNames((response) =>{
            handleUpdateData(response)
        })
    }

    const handleMenuItemClick = (value) =>{

        setDropDownOption(value)
        props.navigateLocation(value)
    }

    const renderPath = () => {
        const path = getPath()
        if(path.length > 1){
            return(
                <PathView>
                    {
                        path && path.map((obj,index) => {
                            return(
                                <PathItem>
                                    <Button variant="text" disabled={index == path.length -1} onClick={() => handlePathClick(obj, index)}>{obj.folder}</Button>
                                    {index != path.length -1 && <Typography variant="h6" component="div">
                                    {'>'}
                                    </Typography>}    
                                </PathItem>
                            )
                               
                        })
                    }
                </PathView>
            )
        }
    }

    const renderFilesIconView = () =>{
        const data = 
        files && files.length > 0 ? <Grid container spacing={3}>
            {
                files.map((file, index) => {
                    return (
                    <Grid item xs={6} sm={3} key={index}>
                        <Button color="inherit" onClick={() => handleOnClick(file)}>
                            {!file.folder && <ZDFileItem selectedObj={selectedItem} item={file}/>}
                        </Button>
                    </Grid>
                )})
            }
        </Grid> : renderNoFilesView()
        return data
    }


    const renderNoFilesView = () => {
        return(
            <NoFileView>
                <img src={NoFilesIcon} width="200" height="200"/>
            </NoFileView>
        )
    }
    const renderFilesListView = () =>{
        return(
            <ListGroup variant="flush">
               {
                    files && files.length > 0? files.map((file, index) => {
                        return (
                        <ListGroup.Item> 
                            <Button 
                                color="inherit"
                                key={file.name}
                                style={{width: '100%',  border:"none", outline:"none"}} 
                                className="d-flex flex-row justify-content-start align-items-center"
                                onClick={() => handleOnClick(file)}>
                                <ZDFileTypeIcon fileType={file.type} iconWidth={'40px'} iconHeight={'40px'} isSmall={true}/>
                                <Typography variant="h7" component="div" style={{marginLeft: '30px'}}>
                                    {file.name}
                                </Typography>  
                            </Button>
                            
                        </ListGroup.Item>
                        
                    )})
                    : renderNoFilesView()
               }
            </ListGroup>
        )
    }

    const renderDisplayButtons = () => {
        return(
            <DisplayOptionsView>
                <Typography variant="h5" component="div">
                        {'Files'}
                </Typography> 
                <GridListOptions>
                    <IconButton onClick={() => setIsListView(true)}>
                        <FormatListBulleted/>
                    </IconButton>
                    <IconButton  onClick={() => setIsListView(false)}>
                        <GridView/>
                    </IconButton>
                </GridListOptions>
            </DisplayOptionsView>
        )
     
    }

    return(
        <ContentView>
            <MainContentView>
                        <ZDSearchBar updatedData={handleUpdateData}/>
                        <ZDProfile profileName={username}/>
            </MainContentView>
            <DropDownView>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dropDownOption}>
                        <MenuItem value={10} onClick={() => handleMenuItemClick(10)}>My drive</MenuItem>
                        <MenuItem value={20} onClick={() => handleMenuItemClick(20)}>Shared Files</MenuItem>
                        <MenuItem value={30} onClick={() => handleMenuItemClick(30)}>Trash</MenuItem>
                    </Select>
                </FormControl>
            </DropDownView>
            <FilesAndDetailsView>
                <FilesView borderColor={COLORS.borderColor}>
                    {renderPath()}
                    <Typography variant="h5" component="div" style={{marginTop:'10px', marginLeft: '10px'}}>
                        {folders && folders.length > 0 ? 'Folders' : 'No Folders'}
                    </Typography>  
                    <Grid container spacing={3}>
                        {
                            folders && folders.length > 0? folders.map((file, index) => {
                                return (
                                <Grid item xs={6} sm={3} key={index}>
                                    <Button color="inherit" onClick={() => handleOnClick(file)} onDoubleClick={() => handleDoubleClick(file)}>
                                        {file.folder && <ZDFolderItem folder={file.name}/>}
                                    </Button>
                                </Grid>
                            )})
                            : <div></div>
                        }
                    </Grid> 
                    {renderDisplayButtons()}
                    {isListview ? renderFilesListView() : renderFilesIconView()}
                </FilesView>
                <ZDRightContent item={selectedItem} updatedData={handleUpdateData} isSharedTab={dropDownOption == 20} updateOption={() => {setDropDownOption(10)}}/>
            </FilesAndDetailsView>
           
        </ContentView>
        
    )
}

