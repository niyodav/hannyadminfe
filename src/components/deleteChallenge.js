import React from 'react'
import {useMutation } from '@apollo/client';
import {DELETE_CHALLENGES} from "./graphql/mutations";


function DeleteChallenge({data}) {
    const [deleteChallenges] = useMutation(DELETE_CHALLENGES);


      
    if (data) {
        console.log(data , "deleye data passed here ")

        deleteChallenges({ variables: {challengeId:data.challengeId}
            });  
        // window.location.reload(false);  
        
     }
     return null
}
export default DeleteChallenge