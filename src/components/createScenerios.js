import React from 'react'
import { useState } from "react";
import {useMutation } from '@apollo/client';

import {CREATE_SCENERIO} from "./graphql/mutations";
import CreateCategory from './createCategory';
import CreateBlock from './createBlock';

function CreateScenerio({scenerioFk}) {
    const [createScenerios ] = useMutation(CREATE_SCENERIO);
    const [items ,setItems] = useState({
        id:"",
        name:""
    })

    function addItem(item){
    setItems(item);
    }
  
    if (items.name) {
        createScenerios({ variables: { scenerioId: items.id,
                name :items.name,
                challengeId:scenerioFk
                } });

        setItems({...items,name:""})
        // window.location.reload(false);   
     }

     return (
        <div>
       <CreateCategory addItem={addItem} label ="차시명" category={"scenerio"}/>  
       {/* <CreateBlock blockFk={items.id}/> */}
       
       </div>

    )

}
export default CreateScenerio 