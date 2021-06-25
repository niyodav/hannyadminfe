import React from 'react'
import { useState } from "react";
import {useMutation } from '@apollo/client';

import {CREATE_TS_BLOCK} from "./graphql/mutations";
import CreateCategory from "./createCategory";
function CreateBlock({blockFk}) {
    const [createTsBlock ] = useMutation(CREATE_TS_BLOCK);
    const [items ,setItems] = useState({
        id:"",
        name:""
    })

    function addItem(item){
    setItems(item);
    }

    if (items.name) {
        createTsBlock({ variables: { blockId: items.id,
                name :items.name,
                scenerioId:blockFk
                } });

        setItems({...items,name:""})
        // window.location.reload(false);   
     }

     return (
        <div>
  
       <CreateCategory addItem={addItem} label ="블록명" category={"block"}/>
  
       </div>

    )

}
export default CreateBlock 