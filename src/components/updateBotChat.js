import React from 'react'
import {useMutation } from '@apollo/client';
import {UPDATE_BOT_CHATS} from "./graphql/mutations";


function UpdatBotChat({data}) {
    const [updateBotChat] = useMutation(UPDATE_BOT_CHATS);


      
    if (data) {
            updateBotChat({ variables: data });  
        // window.location.reload(false);     
        
     }
     return null


}
export default UpdatBotChat
