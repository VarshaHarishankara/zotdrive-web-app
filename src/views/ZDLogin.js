import React, { useState, useEffect } from "react";
import {Form, FormGroup, FormView, LoginView, InputField, LoginBtn, OuterView, Title,TextView, RegisterBtn} from './styles';
import {useWindowDimensions} from '../Manager/ZDDimensions'
import { loginUser } from "../Manager/ZDDataManager";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'

export const ZDLogin = () => {
    const { height, width } = useWindowDimensions();
    let styleHeight = height+'px';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        if(redirect){
            redirectToDashboard()
        }
    },[redirect])

    const handleEmaiChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        const userObject = JSON.stringify({
            email,
            password
        }); 
        event.preventDefault()
        loginUser(userObject, (response) =>{
            if(response.status == 200){
                const res = response.data
                localStorage.setItem("token", res.token)
                localStorage.setItem("rootID", res.rootID)
                localStorage.setItem("parentID", null)
                localStorage.setItem("emailId", res.email)
                setRedirect(true)
            }else{
                alert("Unsuccessfull");
            }
        })
    }

    const redirectToDashboard = () => {
        navigate("/dashboard")
    } 

    const handleRegistration = () => {
        navigate("/signup")
    }

    const theme = createTheme();

    theme.typography.h2 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '5.0rem',
        fontFamily: 'Roboto'
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '5.0rem',
        fontFamily: 'Roboto'
    },
    };

    theme.typography.h4 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '2.0rem',
            fontFamily: 'Roboto',
            fontStyle: 'italic',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.0rem',
            fontFamily: 'Roboto',
            fontStyle: 'italic',
        },
        };

    return(
        <OuterView style={{height: styleHeight}}>
            <LoginView>
                <TextView>
                    <ThemeProvider theme={theme}>
                        <Typography noWrap variant="h2" component="div" sx={{color: '#4F83E7'}}>
                            {"Zotdrive"}
                        </Typography> 
                        <Typography noWrap variant="h4" component="div" sx={{color: 'black'}}>
                            {"One place for all your files"}
                        </Typography> 
                    </ThemeProvider>
                </TextView>
                <FormView>
                    <Form onSubmit={handleSubmit}>
                        <Title>Sign in</Title>

                            <FormGroup>
                                <label>Email</label>
                                <InputField type="email" value={email} placeholder="Enter email" onChange={handleEmaiChange}/>
                            </FormGroup>

                            <FormGroup>
                                <label>Password</label>
                                <InputField type="password" value={password}  placeholder="Enter password" onChange={handlePasswordChange}/>
                            </FormGroup>

                        <LoginBtn type="submit">Sign in</LoginBtn>
                    </Form>
                    <RegisterBtn onClick={handleRegistration}>Create account</RegisterBtn>
                </FormView>
            </LoginView>
       
        
    </OuterView>  
    )
}
