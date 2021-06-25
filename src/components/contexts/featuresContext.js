import  React,{useState,createContext} from 'react'

export const SelectedFeatureContext = createContext();
export const SelectedFeatureProvider= props =>{
    const [selectedfeature  , setSelectedFeature] = useState(false);
    return (
        <SelectedFeatureContext.Provider value={[selectedfeature , setSelectedFeature]}>
            {props.children}  
        </SelectedFeatureContext.Provider>
    );

};


 