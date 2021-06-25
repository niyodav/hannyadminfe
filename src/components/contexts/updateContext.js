import  React,{useState,createContext} from 'react'

export const UpdateContext = createContext();


export const UpdateContextProvider= props =>{
    const [updateCategory  , setUpdateCategory] = useState({
        challengeGroup:false,
        challenge:false,
        scenerio:false,
        block:false,
        botChat:false
    });
    
    return (
        <UpdateContext.Provider value={[updateCategory , setUpdateCategory]}>
            {props.children}  
        </UpdateContext.Provider>
    );

};


 