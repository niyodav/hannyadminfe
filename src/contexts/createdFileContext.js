import  React,{useState,createContext} from 'react'

export const CreatedFileContext = createContext();
export const CreatedFileContextProvider= props =>{
    const [FileData  , setFileData] = useState({
        formData : false
    });
    return (
        <CreatedFileContext.Provider value={[FileData , setFileData]}>
            {props.children}  
        </CreatedFileContext.Provider>
    );

};


 