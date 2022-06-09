import React from 'react';
import {ContextView, HomeView} from './styles'
import background from '../assets/cloud.jpeg'
import {useWindowDimensions} from '../Manager/ZDDimensions'
import {ZDNavBar} from '../components/ZDNavBar'
import Typography from '@mui/material/Typography';

export const ZDHome = () => {
    const { height, width } = useWindowDimensions();
    let styleHeight = height+'px';
    return(
      <HomeView style={{backgroundImage: `url(${background})`, height: styleHeight}}>
        <ZDNavBar/>
        
      </HomeView>
    )
}