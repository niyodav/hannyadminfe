import  React,{useState,createContext} from 'react'

export const CreatedtextContext = createContext();
export const CreatedtextContextProvider= props =>{
    const [text  , setText] = useState({
        pk:'',
        content:'',
        category:'',
        reply:false
    });
    return (
        <CreatedtextContext.Provider value={[text , setText]}>
            {props.children}  
        </CreatedtextContext.Provider>
    );

};


 