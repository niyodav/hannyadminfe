import React from 'react'
import {useMutation } from '@apollo/client';
import {UPDATE_CHALLENGES_APP_DATA} from "../../graphql/mutations";


function UpdateChallengeData({data}) {
    const [updateChallenges] = useMutation(UPDATE_CHALLENGES_APP_DATA);
    console.log(data, 'checking')


      
    if (data) {
        updateChallenges({ variables: data });  
        
     }  
     return null


}
export default UpdateChallengeData
