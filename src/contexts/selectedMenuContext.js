import  React,{useState,createContext} from 'react'

export const SelectedMenuContext = createContext();


export const SelectedMenuContextProvider= props =>{
    const [selectedMenu  , setSelectedMenu] = useState({
        challengeGroup:{id:false,action:false},
        challenge:{id:false,action:false},
        scenerio:{id:false,action:false},
        block:{id:false,action:false},
        botChat:{id:false,action:false}
    });
    
    return (
        <SelectedMenuContext.Provider value={[selectedMenu , setSelectedMenu]}>
            {props.children}  
        </SelectedMenuContext.Provider>
    );

};


