import React, {useState} from 'react';
import { ZDLeftMenu } from '../components/ZDLeftMenu';
import { ZDMainContent } from '../components/ZDMainContent';
import {MainView} from './styles';

export const ZDDashboard = () => {
    const [data, setData] = useState([])
    const [location, setLocation] = useState(10)
    const [option, setOption] = useState(10)

    const handleUpdate = (result) => {
        setData(result)
    }

    return(
        <MainView>
            <ZDLeftMenu updatedData={handleUpdate} updateLocation={(value) => setLocation(value)} handleNavigation={option}/>
            <ZDMainContent results={data} option={location} navigateLocation={(value) => setOption(value)}/>
        </MainView>
    )
}

