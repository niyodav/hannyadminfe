
import { gql } from '@apollo/client';

export const CHALLENGE_GROUPS = gql`
query($orderBy: String!){
    challengeGroups(orderBy:$orderBy){
      edges {
        node {
          challengeId
          name  
          lastUpdated
          groupChallenge{
            totalCount
          }
        }
      }
    }
  }
`;

export const CHALLENGES = gql`
query($challengeGroupId: String!,$orderBy: String!){
  challenges(challengeGroupId:$challengeGroupId,orderBy:$orderBy){
    edges{
      node{
      name
      challengeId
      lastUpdated
      challengeScenerio{
        totalCount
      }
      
      }
    }
  }
  }
`;

export const ALL_CHALLENGES = gql`
query{
  challenges{
    edges{
      node{
      name
      challengeId
      period
      percentage
      colors
      
      description
      price


  
      }
    }
  }
  }
`;
export const CHALLENGES_MANAGEMENT = gql`
query{
  challenges{
    edges{
      node{
      name
      challengeId
      lastUpdated
  
    
      }
    }
  }
  }
`;

export const CHALLENGES_ORDERBY = gql`
query($orderBy: String!){
  challenges(orderBy:$orderBy){
    edges{
      node{
      name
      challengeId
      lastUpdated
      challengeScenerio{
        totalCount
      }
    
      }
    }
  }
  }
`;


export const CHALLENGES_FILTER_CHALLENGEID = gql`
query($challengeId: String!){
  challenges(challengeId:$challengeId){
    edges{
      node{
        challengeId
        challengeScenerio{
          totalCount
          edges{
            node{
              scenerioId
              name
              scenerioBlocks{
                totalCount
                edges{
                  node
                  {
                    blockId
                    name
                    botBlock{
                      edges{
                        node{
                          botChatId
                          botChat

                        }
                      }
                    }
                    
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  }
`;

export const CHALLENGES_TO_BLOCK = gql`
query($challengeId: String!){
  challenges(challengeId:$challengeId){
    edges{
      node{
        challengeScenerio{
          edges{
            node{
              scenerioId
              name
              scenerioBlocks{
                edges{
                  node{
                    blockId
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  }
`;

export const TS_SCENERIO = gql`
query($challengeId: String!, $orderBy:String!){
  tsScenerio(challengeId:$challengeId, orderBy:$orderBy){
    edges{
      node{
      name
      scenerioId
      lastUpdated
      scenerioBlocks{
        totalCount
      }
      }
    }
  }
  }
`;

export const TS_BLOCKS = gql`
query($scenerioId: String!, $orderBy: String!){
  tsBlocks(scenerioId:$scenerioId,orderBy:$orderBy){
    edges{
      node{
      name
      blockId
      }
    }
  }
  }
`;
export const BLOCK_PER_CHALLENGE = gql`
query{
  tsBlocks{
    edges{
      node{
      name
      blockId
      lastUpdated
      }
    }
  }
  }
`;

export const BLOCKS_BOTCHAT = gql`
query($scenerioId: String!){
  tsBlocks(scenerioId:$scenerioId){
    edges{
      node{
      name
      blockId
      lastUpdated
      }
    }
  }
  }
`;
export const BLOCKS_TO_CHALLENGE = gql`
query($challengeIdFilter: String!){
  tsBlocks(challengeIdFilter:$challengeIdFilter){
    edges{
      node{
        blockId
        name
        botBlock{
          edges{
            node{
              botChat
            }
          }
        }
        scenerio{
          scenerioId
          name
          challenge{
            challengeId
          }
        }
        
      }
    }
  }
  }
`;

export const BOT_CHATS = gql`
{
    botChats {
      edges {
        node {
          botChatId
          botChat
          category
          options
          lastUpdated
        }
      }
    }
  }
`;
export const RESPONSES = gql`
{
    responses{
      edges {
        node {
          response
          category
          options
          lastUpdated
          bot{
              botId
          }
          block{
              blockId
          }
        }
      }
    }
  }
`;
export const BOTCHATS_RESPONSES = gql`
query($blockId: String!,$orderBy: String!){
  botChats(blockId:$blockId,orderBy: $orderBy){
    edges{
      node{
        botChat
        botChatId
        uploadsBotChats{
          edges{
            node{
              uploadType
              uploadId
              upload
              title
              description
            }
          }
        }
        botResponses{
          edges{
            node{
              response
              responseId
              redirect
              redirectToBot
              redirectToBlock
              redirectToScenerio         
            }
          }
        }
      }
    }
  }
  }
`;


export const ALL_MESSAGES = gql`
query{
  allMessages(orderBy:"messageId", last:10){
    edges{
      node{
        createdAt
        messageId
        message
        lastIdx
        user{
          username
        }
        room{
          roomId
        }
      }
    }
  }
}
`;


export const POINT_DISTRIBUTION = gql`
query{
  pointDistribution{
    edges{
      node{
        pointId
        action
        points
        percentage
        add
        createdAt
      }
    }
  }
}
`;



export const POINT_TO_CASH = gql`
query{
  pointsToCash{
    edges{
      node{
        pointId
        points
        cash
        createdAt
        
       
      
      }
    }
  }
}
`;


export const POINTS_MAXIMUM = gql`
query{
  pointsMaximum{
    edges{
      node{
        pointId
        day
        month
        year
        points
        createdAt
      
      }
    }
  }
}
`;


export const POINT_MANAGEMENT = gql`
query{
  pointManagement{
    edges{
      node{
        
        pointId
        action
        points
        add
        user{
          username
        }
        createdAt
      
      }
    }
  }
}
`;

