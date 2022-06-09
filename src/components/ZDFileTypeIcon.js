import React from 'react';
import {Box} from '@mui/material'


export const ZDFileTypeIcon = (props) => {
    const widthProp = props.iconWidth
    const heightProp = props.iconHeight
    const fontSizeProps = props.isSmall ? '0.870rem' : 'h4.fontSize'
    return(
        <Box
                component="div"
                sx={{
                    display: 'flex',
                    p: 1,
                    marginLeft: props.isSmall ? 1 : 3,
                    bgcolor: '#929292',
                    color: '#fff',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    fontSize: fontSizeProps,
                    fontWeight: 'Bold',
                    width: widthProp,
                    height: heightProp,
                    justifyContent: 'center',
                    textTransform: 'uppercase',
                    fontFamily: 'Monospace',
                    alignItems: 'center' 
                }}
            >
                {props.fileType}
            </Box>
    )
}