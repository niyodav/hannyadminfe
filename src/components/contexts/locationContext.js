import  React,{useState,createContext} from 'react'

export const LocationContext = createContext();


export const LocationContextProvider= props =>{
    const [locationContext  , setLocationContext] = useState({
        challengeGroup:'/',
        challenge:'/challenge',
        scenerio:'/schenerio',
        block:'/block',
        botChat:'/chat'
    });
    
    return (
        <LocationContext.Provider value={[locationContext , setLocationContext]}>
            {props.children}  
        </LocationContext.Provider>
    );

};


 