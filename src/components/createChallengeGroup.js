import React from 'react'
import { useState,useEffect } from "react";
import {useMutation } from '@apollo/client';
import {CREATE_CHALLENGE_GROUPS} from "./graphql/mutations";
import CreateCategory from './createCategory';
import CreateChallenge from './createChallenge';

import {CHALLENGE_GROUPS} from "./graphql/queries";

function CreateChallengeGroup({addAdded}) {

    const [added,setAdded] = useState(false)

    const [items ,setItems] = useState({
        id:"",
        name:""
    })


    
    const [createChallengeGroup,{ data, error }] = useMutation(CREATE_CHALLENGE_GROUPS);
  
       useEffect(() => {


        if (items.name) {
            createChallengeGroup(
                { 
                  
                
                variables: { challengeId: items.id,
                    name :items.name
                    },
    
                
                
                });
                // return { createChallengeGroup, data, error };
    
            setAdded(true)
            addAdded(added)
            setItems({...items,name:""})
            // window.location.reload(false);
            // setAdded(false)
        
        }
        // if (items.name) {
        //     let a = createChallengeGroup({ variables: { challengeId: items.id,
        //             name :items.name
        //             } });
        //     addAdded(added)
        //     setItems({...items,name:""})
        //     setAdded(false)
            

        //     // console.log(a,"useeffect")
        //     // window.location.reload(false);   
        //  } 
    }, [items.name]);


    function addItem(item){
    setItems(item);
    }

    function addAdded(add){
        setAdded(add)
    }



    

    // if (items.name) {
    //     createChallengeGroup({ variables: { challengeId: items.id,
    //             name :items.name
    //             } });

    //     setItems({...items,name:""})
    //     // window.location.reload(false);   
    //  }
    
    // if (items.name) {
    //     createChallengeGroup(
    //         { 
    //             refetchQueries: [{
    //                 query: CHALLENGE_GROUPS,
    //               }],
            
    //         variables: { challengeId: items.id,
    //             name :items.name
    //             },

            
            
    //         });
    //         // return { createChallengeGroup, data, error };

    //     setAdded(true)
    //     addAdded(added)
    //     setItems({...items,name:""})
    //     // window.location.reload(false);
    //     // setAdded(false)
    
    // }
    

     return (
         <div>
        <CreateCategory addItem={addItem} addAdded={addAdded} label ="해피 챌린지 그룹명" category={"challengeGroup"}/>
        {/* <CreateChallenge challengeFk={items.id}/> */}
        {/* {console.log(items.id)} */}
        </div>
     )
}
export default CreateChallengeGroup