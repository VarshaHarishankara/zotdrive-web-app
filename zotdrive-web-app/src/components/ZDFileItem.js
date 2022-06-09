import React from 'react';
import {FileIconView, FileInitialView, FileNameView, InitialContainer} from './styles'
import Typography from '@mui/material/Typography';
import { ZDFileTypeIcon } from './ZDFileTypeIcon';

export const ZDFileItem = (props) => {
    const {selectedObj, item} = props
    return(
        <FileIconView>
            <FileInitialView>
                <InitialContainer>
                        <Typography noWrap variant="h3" component="div" sx={{color: 'white'}}>
                            {item.name.charAt(0)}
                        </Typography> :            
                </InitialContainer>                
            </FileInitialView>
            <FileNameView>
                <ZDFileTypeIcon fileType={item.type} iconWidth={'30px'} iconHeight={'30px'} isSmall={true}/>
                <Typography noWrap variant="h7" component="div" sx={{marginLeft: '8px'}}>
                    {item.name}
                </Typography>    
            </FileNameView>
        </FileIconView>
    )
}