import styled from 'styled-components'

export const MainView = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const OuterView = styled.div`
    background: #F0F2F5;
    background: -webkit-linear-gradient(top left, #F0F2F5, #F0F2F5);
    background: -moz-linear-gradient(top left, #F0F2F5, #F0F2F5);
    background: linear-gradient(to bottom right, #F0F2F5, #F0F2F5);  
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1;
`;

export const HomeView = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    flex:1;
    height:'100vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
`;

export const FormView = styled.div`
    width: 350px;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
    display: flex;
    flex-direction: column 
`;

export const ForgotPassword = styled.p`
    text-align: left;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
`;

export const Title = styled.h3`
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
`;

export const LoginBtn = styled.button`
    background-color: #4F83E7;
    color: white;
    font-size: 15px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
`;

export const RegisterBtn = styled.button`
    background-color: #65B561;
    color: white;
    font-size: 15px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    align-self: 'center'
`;

export const Form = styled.form`
    display: flex;
    justify-content: space-between; 
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #808080;
`;

export const FormGroup = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const InputField = styled.input`
    width: 100%;
    height: 45px;
    position: relative;
    padding: 0px 16px;
    border-radius: 4px;
    font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    color: #282828;
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
    -webkit-appearance: none;
    margin-top:5px;
`;

export const ContextView = styled.div`
    display: flex;
    justify-content:flex-end;
    align-items: flex-end;
    margin-right: 100px;
    margin-bottom: 50px;
`;

export const LoginView = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    margin-left: 300px;
    margin-right: 200px;
`;

export const TextView = styled.div`
    display: flex;
    flex-direction: column;
`;