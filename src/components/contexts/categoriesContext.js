import  React,{useState,createContext} from 'react'

export const CategoryContext = createContext();


export const CategoryProvider= props =>{
    const [newCategory , setNewCategory] = useState({
        challengeGroup:false,
        challenge:false,
        scenerio:false,
        block:false,
    });
    
    return (
        <CategoryContext.Provider value={[newCategory , setNewCategory]}>
            {props.children}  

        </CategoryContext.Provider>
    );

};


 