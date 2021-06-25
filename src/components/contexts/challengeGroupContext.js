import  {React,useState,createContext} from 'react'

export const ChallengeGroupContext = createContext()


export function ChallengeGroupProvider(props){
    const [newChallengeGroup , setNewCchallengeGroup] = useState()
    
    return (
        <ChallengeGroupContext.Provider value={[newChallengeGroup , setNewCchallengeGroup]}>
            {props.children}

        </ChallengeGroupContext.Provider>
    )

}


 