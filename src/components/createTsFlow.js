import React from 'react'
import { useState } from "react";
import {useMutation } from '@apollo/client';
import uuid from "uuid";

import {CREATE_TS_BOT,CREATE_TS_USER} from "./graphql/mutations";
import UploadFiles from './features/createFiles';
import CreateText from './features/createText';

function CreateTsFlow({blockFk}) {
    const [createBotChat] = useMutation(CREATE_TS_BOT);
    const [createUserChat] = useMutation(CREATE_TS_USER);

    const [text,setText] = useState({
        content:"",
        category:"",
        pk:""
    });
    const [file,setFile] = useState({
        content:"",
        category:"",
        pk:""
    });
    const [displays , setDisplays] = useState({
        text : false,
        file : false,

    })



    function handleDisplay(e){
        if(e.target.id === "text"){
            setDisplays({...displays, 
                text:true,
                file : false,
           
            })
        }

        else if(e.target.id === "response"){
            setDisplays({...displays, 
                text:true,
                file : false,
   

            })
        }
        else if(e.target.id === "image"){
            setDisplays({...displays, 
                text:false,
                file : true,
  

            })
        }
        else if(e.target.id === "typing"){
            setDisplays({...displays, 
                text:false,
                file : false,

            
            })
        }
        else if(e.target.id === "video"){
            setDisplays({...displays, 
                text : false,
                file : true,
            
            })
        }
        else if(e.target.id === "audio"){
            setDisplays({...displays, 
                text:false,
                file : true,
          
            
            })
        }
    }

    //adds text feature
    function addText(text){
    setText(text);
    }

    // adds file feature
    function addFile(file){
        setFile(file);
        }

    // creates mutations
    function createFeature(feature,setFeatureState){
        if (feature.content) {

            createBotChat({ variables: { 
                botChatId: feature.pk,
                botChat :feature.content,
                blockId:blockFk
                    } });

            createUserChat({ variables: { 
                    userChatId: uuid.v4(),
                    userChat :feature.content,
                    botId : feature.pk,
                    blockId:blockFk
                    
                    } });
            
            setFeatureState({...feature,content:""})
        }
    }

    if(text.content){
        console.log(text)
        createFeature(text,setText)
    }
    else if(file.content){
        createFeature(file,setFile)
        console.log(file.content+ " texts   "+ text.content)

    }
    

    //  const { loading, error, data } = useQuery(TS_BOT,{
    //     pollInterval:600000,
    // });
    
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>there was an error</p>;
    // console.log(data)


     return (
         <div>
              {/* {    
                data.hannyTsBot.edges.map(block=>(
                        <List>
                            <ListItem>
                            [BOT] {block.node.botChat}
                            </ListItem>
                        </List> 
                    ))
            } */}
             {displays.file ? 
             <UploadFiles addFile={addFile}/> 
            :
            <CreateText addText={addText}/>
            
        }
        {/* {console.log(data)} */}
            <div className='features-control'>
                <div id="text" className="features" onClick={handleDisplay}>
                        text
                    </div>
                    <div id="image" className="features" onClick={handleDisplay}>
                        image 
                    </div> 
                    <div id="typing" className="features" onClick={handleDisplay}>
                        typing

                    </div>  
                    <div id="video" className="features" onClick={handleDisplay}>
                        video

                    </div>  
                    <div id="audio" className="features" onClick={handleDisplay}>
                        Audio

                    </div>  

                    <div id="response" className="response" onClick={handleDisplay}>
                        답변하기 
                    </div>   
                    <div id="response" className="response" onClick={handleDisplay}>
                        attribute
                    </div>   
                </div>

        </div>

     )
}
export default CreateTsFlow 