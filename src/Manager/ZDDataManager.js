import axios from "axios";
import {GET_API} from "./ZDAPIUtils"
import {getFoldersAndFiles,getCurrentFolder} from "./ZDDataUtils"

export const fetchFileNames = (callback) => {
  const url = "/file-chunk/files"
  const parentId = getCurrentFolder()
  const params = {
    "parentId": parentId.id
}
  GET_API(url,params,(response)=>{
    callback(getFoldersAndFiles(response.data))
  }, (error) => {
      console.log(error)
  })
}

export const createUser = (object, callback) => {
  console.log("create user", object)
  const url = "/api/auth/signup/"
  axios
    .post(url, object,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then((response) => {
      console.log(response)
      callback(response)
    })
    .catch((error) => {
      console.log("fail")
    })
}

export const loginUser = (object, callback) => {
  console.log("login user", object)
  const url = "/api/auth/signin/"
  axios
    .post(url, object,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then((response) => {
      callback(response)
    })
    .catch((error) => {
      console.log("fail")
    })
}

export const uploadFileToServer = (uploadFile, tags, callback) => {
    const formData = new FormData();
    const fileName = uploadFile[0].name
    const parentId = getCurrentFolder()

    formData.append('file', uploadFile[0]);
    formData.append('Tags', tags);
    formData.append('parentId', parentId.id);
    formData.append('fileName', fileName);
    console.log(formData)
    let url = "/file-chunk/"+fileName
    axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
        callback()
    })
    .catch((error) => {
      console.log("fail")
    });
}

export const deleteFile = (fileId, success, failure) => {
  let url = "/file-chunk/"+fileId
    axios
    .delete(url,{
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
        success(response)
    })
    .catch((error) => {
      console.log("fail")
      failure(error)
    });
}

export const downloadFile = (fileId, success, failure) => {
    axios
    .get("/file-chunk/downloadFile",{
      params:{
        "uuid" : fileId
      },
      headers:{
        "Authorization": "Bearer " + localStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      responseType: 'blob' 
    })
    .then((response) => {
        success(response)
    })
    .catch((error) => {
      console.log("fail")
      failure(error)
    })
}

export const openFile = (fileId, success, failure) => {
  axios
  .get("/file-chunk/openDownloadFile",{
    params:{
      "uuid" : fileId
    },
    headers:{
      "Authorization": "Bearer " + localStorage.getItem("token"),
      'Content-Type': 'application/json'
    },
    responseType: 'blob' 
  })
  .then((response) => {
      success(response)
  })
  .catch((error) => {
    console.log("fail")
    failure(error)
  })
}

export const updateFile = (filename, tags, objectId, success, failure) => {
    const formData = new FormData();
    const parentId = getCurrentFolder()
    const url = "/file-chunk/updateFile/"+objectId
    formData.append('Tags', tags);
    formData.append('parentId', parentId.id);
    formData.append('fileName', filename);
  
    axios
    .post(url, formData, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      console.log("fail")
      failure()
    });
}

export const createFolder = (folderName, success, failure) => {
  const formData = new FormData();
  const parentId = getCurrentFolder()
  const url = "/file-chunk/folder"
  formData.append('Tags', "");
  formData.append('parentId', parentId.id);
  formData.append('fileName', folderName);

  axios
  .post(url, formData, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then((response) => {
    success(response)
  })
  .catch((error) => {
    console.log("fail")
    failure()
  });
} 

export const shareFile = (emailId, object, success, failure) =>{
  const url = "/file-chunk/sharefile"
  console.log(emailId, object)
  const params = {
    object_id: object.objectid,
    email: emailId
}
  GET_API(url,params,(response)=>{
    success(response)
  }, (error) => {
      console.log(error)
      failure()
  })
}


export const fetchSharedFiles = (keyword,success, failure) => {
  const url = "/protected/api/search"

  const params = {
    "keyword": keyword,
    "deleted": false
  }
 
  axios
  .post(url, {
    params: params
  })
  .then((response) => {
    success(getFoldersAndFiles(response))
  })
  .catch((error) => {
    console.log("fail")
    failure()
  });
}

export const unshareFile = (object, email, success, failure) => {
  const url = "/file-chunk/unsharefile"
  const params = {
    object_id: object.objectid,
    email: email
  }
  GET_API(url,params,(response)=>{
    success(response)
  }, (error) => {
      console.log(error)
      failure()
  })
}

export const getAllSharedFiles = (success, failure) => {
  const url = "/file-chunk/sharedfiles"
  GET_API(url,{},(response)=>{
    success(getFoldersAndFiles(response.data))
  }, (error) => {
      console.log(error)
      failure()
  })
}

export const getAllDeletedFiles = (success, failure) => {
  const url = "/file-chunk/getDeletedFile"
  GET_API(url,{},(response)=>{
    success(getFoldersAndFiles(response.data))
  }, (error) => {
      console.log(error)
      failure()
  })
}

export const restoreFile = (object, success, failure) => {
  const url = "/file-chunk/recoverFile"
  const params={
    object_id: object.objectid
  }
  GET_API(url,params,()=>{
    success()
  }, (error) => {
      failure()
  })
}

export const fetchFilesWithText = (query, deleted, success, failure) => {
  const url = "/protected/api/search"
  const body = {
    "keyword" : query,
    "deleted": deleted
  }
  axios
  .post(url, body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  })
  .then((response) => {
      success(getFoldersAndFiles(response.data))
  })
  .catch((error) => {
    failure()
  });
}

export const getShareableLink = (object, success, failure) => {
  const url = "/file-chunk/shareLink"
  const params={
    object_id: object.objectid
  }

  GET_API(url,params,(response)=>{
    success(response)
  }, (error) => {
      failure()
  })

}