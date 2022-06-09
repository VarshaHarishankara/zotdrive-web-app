import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';

export const LeftMenuView = styled.div`
border-right: 1px solid ${props => props.borderColor};
display: flex;
width: 20%;
`;

export const LeftContent = styled.div`
margin:40px;
`;

export const MainContentView = styled.div`
display: flex;
flex-direction: row;
height: 10%;
border-bottom: 1px solid ${props => props.borderColor};
`;

export const DropDownView = styled.div`
display: flex;
margin-left: 30px;  
margin-top: 20px;
margin-right: 20px;
`;

export const ContentView = styled.div`
display: flex;
width: 100%;
flex-direction: column;
height: 100vh;
`;

export const MainView = styled.div`
display: flex;
height: 100vh;
width: 100%;
flex-direction: flex-start;
`;

export const SearchView =  styled.div`
width: 70%;
margin: 20px
`;

export const StyledButton = styled(Button)`
  background: #4F83E7;
  background: -webkit-linear-gradient(top left, #4F83E7, #4F83E7);
  background: -moz-linear-gradient(top left, #4F83E7, #4F83E7);
  background: linear-gradient(to bottom right, #4F83E7, #4F83E7); 
  border-radius: 3px;
  border: 0;
  height: 50px;
  width: 200px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(169, 169, 169, .3);
`;

export const ItemView = styled.div`
  display:flex;
`;

export const OptionsContainer = styled.div`
margin-top: 70px;
`

export const WhiteBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: black;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

export const ProfileBtn = styled(Button)`
  width:100%;
`;

export const ProfileView = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
`;

export const FilesView = styled.div`
  margin-left: 30px;
  padding-right: 50px;
  flex: 1;
  border-right: 1px solid ${props => props.borderColor};
`;

export const FileItem = styled.div`
  margin-bottom:30px;
`;

export const FileIconView = styled.div`
    width: 200px;
    border: 2px solid #808080;
    border-radius: 10px;
    &:hover {
      border-color: #1F51FF;
    }
`;

export const FileInitialView = styled.div`
    border-bottom: 2px solid #808080;
    &:hover {
      border-color: #1F51FF;
    };
`;

export const FileNameView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => props.selectedColor};
  border-radius: 3px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const InitialContainer = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background: #4F83E7;
`;

export const FilesAndDetailsView = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: scroll:
`;

export const DetailsView = styled.div`
  display:flex;
  margin: 30px;
  flex-direction: row
`;

export const DetailRowView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start
`;

export const RightContentView = styled.div`
  display: flex;
  flex: 0 0 250px;
  flex-direction: column;
`;

export const RightContentDefaultView = styled.div`
  display: flex;
  flex: 0 0 250px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px
`;

export const RightLabelView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start
`;

export const ClearView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%
`;

export const FileOptionsView = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: space-between
`;

export const RestoreView = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center
`;

export const FormDialog = styled.form`
    display: flex;
    flex-direction: column;
`;

export const PathView = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 30px
`;

export const PathItem = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SharedPeopleView = styled.div`
    display: flex;
    margin: 20px;
`;

export const DisplayOptionsView = styled.div`
  display: flex;
  flex-direction: row;
  margin-top:30px;
  margin-left: 10px;
  align-items: center
`;

export const GridListOptions = styled.div`
display: flex;
flex-direction: row;
margin-left: auto;
`;

export const NoFileView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;