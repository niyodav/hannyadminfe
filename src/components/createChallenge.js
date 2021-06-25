import React from 'react'
import { useState } from "react";
import {useMutation } from '@apollo/client';
import {CREATE_CHALLENGES} from "./graphql/mutations";
import CreateCategory from './createCategory';
import CreateScenerio from './createScenerios';
function CreateChallenge({challengeFk}) {
    const [createChallenges,{error,data} ] = useMutation(CREATE_CHALLENGES,  {
        onCompleted: (data) => {
          console.log(data);
        }
      });
    
    const [items ,setItems] = useState({
        id:"",
        name:""
    })
    function addItem(item){
    setItems(item);
    }
    
    if (items.name) {

        const a = createChallenges({ variables: { challengeId: items.id,
            name :items.name,
            challengegroupId: challengeFk,
            } });

            console.log(data,error)


        setItems({...items,name:""})
        // window.location.reload(false);   
     }
// console.log(items)
 
     return (
         <div>
            <CreateCategory addItem={addItem} label="해피 챌린지명" category={"challenge"}/>
            {/* <CreateScenerio scenerioFk={items.id}/> */}

   
        </div>

     )
}
export default CreateChallenge 