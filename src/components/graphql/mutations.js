import { gql } from '@apollo/client';


export const CREATE_CHALLENGE_GROUPS = gql`
    mutation($challengeId:String!, $name:String!){
        createChallengeGroups(input:{
            challengeId:$challengeId,
            name : $name,
        }){
          challengeGroup{
            challengeId,
            name
          }
        }
    }
 `
;

export  const CREATE_CHALLENGES = gql`
mutation($challengeId:String!, $name:String!,$challengegroupId:String!){
  createChallenges(input:{
    challengeId:$challengeId,
      name : $name,
      challengegroupId : $challengegroupId,
  }){
    challenge{
      name,
    }
  }
}
`;

export const CREATE_SCENERIO = gql`
mutation($scenerioId:String!, $name:String!,$challengeId:String!){
  createScenerio(input:{
    scenerioId:$scenerioId,
    name : $name,
    challengeId:$challengeId
  }){
    scenerio{
      scenerioId,
    }
  }
}
`;

export const CREATE_TS_BLOCK = gql`
mutation($blockId:String!, $name:String!,$scenerioId:String!){
  createTsBlock(input:{
    blockId:$blockId,
    name: $name,
    scenerioId:$scenerioId
    
  }){
    block{
      name
    }
  }
}
`;

export  const CREATE_BOT_CHATS = gql`
mutation($botChatId:String!,$botChat:String!,$blockId:String!){
  createBotChats(input:{
    botChatId:$botChatId,
    botChat:$botChat,
    blockId:$blockId,

  }){
    bot{
      botChatId

      
    }
  }
}
`;

export const CREATE_RESPONSES = gql`
mutation($responseId:String!,$response:String!, $botId:String!){
  createResponses(input:{
    responseId:$responseId,
    response:$response,
    botId:$botId,
  
  }){
    response{
      responseId
   
      
    }
  }
}
`;

// Updates 

export const UPDATE_CHALLENGE_GROUPS = gql`
    mutation($challengeId:String!, $name:String!){
      updateChallengeGroup(challengeId:$challengeId,input:{
            
            name : $name,
        }){
          challengeGroup{
            challengeId,
            name
          }
        }
    }
 `
;

export  const UPDATE_CHALLENGES = gql`
mutation($challengeId:String!, $name:String!){
  updateChallenge(challengeId:$challengeId,input:{
    
      name : $name,
  }){
    challenge{
      name,
    }
  }
}
`;


export  const UPDATE_CHALLENGES_APP_DATA = gql`
mutation($challengeId:String!,
   $name:String,
   $percentage:Int,
   $price:Int,
   $colors:String,
   $description:String,
   $period:Int

   ){
  updateChallenge(challengeId:$challengeId,input:{
    
      name : $name,
      percentage: $percentage,
      colors: $colors,
      description: $description,
      period: $period,
      price: $price,




  }){
    challenge{
      name,
    }
  }
}
`;


export const UPDATE_SCENERIO = gql`
mutation($scenerioId:String!, $name:String!){
  updateScenerio(scenerioId:$scenerioId,input:{
    name : $name,
  }){
    scenerio{
      scenerioId,
    }
  }
}
`;


export const UPDATE_TS_BLOCK = gql`
mutation($blockId:String!, $name:String!){
  updateBlock(blockId:$blockId,input:{
    name: $name,
    
  }){
    block{
      name
    }
  }
}
`;

export  const UPDATE_BOT_CHATS = gql`
mutation($botChatId:String!,$botChat:String!){
  updateBotChats(botChatId:$botChatId,input:{
    botChat:$botChat,

  }){
    botChat{
      botChatId

      
    }
  }
}
`;
export  const UPDATE_BOTUPLOADS = gql`
mutation($uploadId:String!,$title:String!,$description:String!){
  updateBotUploads(uploadId:$uploadId,input:{
    title:$title,
    description:$description
  }){
    uploads{
      title
      description
    }
  }
}
`;


export const UPDATE_RESPONSES_REDIRECT_TO_BLOCK = gql`
mutation($responseId:String!,
   $redirect:String!){
  updateResponses(responseId:$responseId,input:{
    redirect:$redirect,

  }){
    response{
      responseId
      
    }
  }
}
`;
export const UPDATE_RESPONSES_REDIRECT_TO_SCENERIO = gql`
mutation($responseId:String!,
   $redirectToScenerio:String!){
  updateResponses(responseId:$responseId,input:{
    redirectToScenerio:$redirectToScenerio,

  }){
    response{
      responseId
   
      
    }
  }
}
`;

export const UPDATE_RESPONSES_REDIRECT_TO_BOT = gql`
mutation($responseId:String!,
   $redirectToBot:String!){
  updateResponses(responseId:$responseId,input:{
    redirectToBot:$redirectToBot,

  }){
    response{
      responseId
   
      
    }
  }
}
`;

// delete mutations 

export const DELETE_CHALLENGE_GROUPS = gql`
    mutation($challengeId:[String]!){
      
      deleteChallengeGroup(challengeId:$challengeId){
          challengeGroup{
            challengeId
          }
        }
    }
 `
;

export  const DELETE_CHALLENGES = gql`
mutation($challengeId:[String]!){
  deleteChallenge(challengeId:$challengeId){
    challenge{
      name,
    }
  }
}
`;

export const DELETE_SCENERIO = gql`
mutation($scenerioId:[String]!){
  deleteScenerio(scenerioId:$scenerioId){
    scenerio{
      scenerioId,
    }
  }
}
`;


export const DELETE_TS_BLOCK = gql`
mutation($blockId:[String]!){
  deleteBlock(blockId:$blockId){
    block{
      blockId,
    }
  }
}
`;

export  const DELETE_BOT_CHATS = gql`
mutation($botChatId:[String]!){
  deleteBotChats(botChatId:$botChatId){
    botChat{
      botChatId,
    }
  }
}
`;

export const DELETE_RESPONSES = gql`
mutation($responseId:String!,$response:String!, $botId:String!, $blockId:String!){
  deleteResponses(input:{
    responseId:$responseId,
    response:$response,
    botId:$botId,
    blockId:$blockId
  
  }){
    response{
      responseId
   
      
    }
  }
}
`;






