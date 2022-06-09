import axios from "axios";

export const GET_API = (url, parameters, success, failure) => {
    axios
    .get(url,{
      params:parameters,
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
        success(response)
    })
    .catch((error) => {
        failure(error)
    });
}
