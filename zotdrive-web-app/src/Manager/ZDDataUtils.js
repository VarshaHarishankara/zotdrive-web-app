
let path = [{
    folder: "Home",
    id: localStorage.getItem("rootID")
}]

export const addPath = (folder) => {
    path.push({
        folder: folder.name,
        id: folder.objectid
    })
}

export const getCurrentFolder = () => {
    return path[path.length-1]
}

export const deleteAllPath = () => {
    path.splice(1)
}

export const getPath = () => {
    return path
}

export const popPath = (index) => {
    path.splice(index)
}

export const getFoldersAndFiles = (data) => {
    let folderList = []
    let fileList = []
    data && data.map((item)=>{
        console.log(item)
        if(item.folder){
            folderList.push(item)
        }else{
            fileList.push(item)
        }
    })

    return {
        folders: folderList,
        files: fileList
    }
}

export const getSharedWithList = (user) => {
    let users = []
    user && user.userList && user.userList.map((object)=>{
        users.push(object.user)
    })
    users.push(user.createdBy)
    return users
}