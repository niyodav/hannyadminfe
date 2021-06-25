import  React,{useState,createContext} from 'react'

export const SelectedBlockContext = createContext();


export const SelectedBlockContextProvider= props =>{
    const [selectedBlock  , setSelectedBlock] = useState(false);
    
    return (
        <SelectedBlockContext.Provider value={[selectedBlock , setSelectedBlock]}>
            {props.children}  
        </SelectedBlockContext.Provider>
    );

};


 