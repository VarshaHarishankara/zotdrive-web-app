import React, {useEffect, useState} from "react";
import {ForgotPassword, Form, FormGroup, FormView, InputField, OuterView, Title, LoginBtn} from './styles';
import {useWindowDimensions} from '../Manager/ZDDimensions'
import { createUser } from "../Manager/ZDDataManager";
import { Link, useNavigate } from "react-router-dom";

export const ZDSignUp = () => {
    const { height, width } = useWindowDimensions();
    let styleHeight = height+'px';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        if(redirect){
            redirectToLogin()
        }
    },[redirect])

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmaiChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        const userObject = JSON.stringify({
            firstName,
            lastName,
            email,
            password
        }); 
        event.preventDefault()
        createUser(userObject, (response) =>{
            if(response.status == 200){
                setRedirect(true)
            }else{
                alert("Unsuccessfull");
            }
        })
    }

    const redirectToLogin = () => {
            navigate("/login")
    }

    return(
        <OuterView style={{height: styleHeight}}>
            <FormView>
                <Form onSubmit={handleSubmit}>
                    <Title>Sign up</Title>
                    <FormGroup>
                        <label>First name</label>
                        <InputField type="text" value={firstName} placeholder="First name" onChange={handleFirstNameChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Last name</label>
                        <InputField type="text" value={lastName} placeholder="Last name" onChange={handleLastNameChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email</label>
                        <InputField type="email" value={email} placeholder="Enter email" onChange={handleEmaiChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Password</label>
                        <InputField type="password" value={password} placeholder="Enter password" onChange={handlePasswordChange}/>
                    </FormGroup>

                    <LoginBtn type="submit">Register</LoginBtn>
                    <ForgotPassword>
                        Already registered <Link to="/login">log in?</Link>
                    </ForgotPassword>
                </Form>

            </FormView>
            
        </OuterView>
    )
}
