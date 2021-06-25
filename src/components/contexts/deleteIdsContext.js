import  React,{useState,createContext} from 'react'

export const DeleteIdsContext = createContext();
export const DeleteIdsContextProvider= props =>{
    const [deleteIdsCategory  , setDeleteIdsCategory] = useState({
        challengeGroup:false,
        challenge:false,
        scenerio:false,
        block:false,
        botChat:false
    });
    return (
        <DeleteIdsContext.Provider value={[deleteIdsCategory , setDeleteIdsCategory]}>
            {props.children}  
        </DeleteIdsContext.Provider>
    );

};


 