import  React,{useState,createContext} from 'react'

export const SelectedCategoryContext = createContext();


export const SelectedCategoryContextProvider= props =>{
    const [selectedCategory  , setSelectedCategory] = useState({
        challengeGroup:false,
        challenge:false,
        scenerio:false,
        block:false,
        botChat:false
    });
    
    return (
        <SelectedCategoryContext.Provider value={[selectedCategory , setSelectedCategory]}>
            {props.children}  
        </SelectedCategoryContext.Provider>
    );

};


