import React from 'react'
import { useState , useContext} from "react";
import { useQuery } from '@apollo/client';
import {CHALLENGES_FILTER_CHALLENGEID} from "./graphql/queries";
import {useMutation } from '@apollo/client';

import {CREATE_BOT_CHATS,UPDATE_RESPONSES_REDIRECT_TO_BLOCK,
    UPDATE_RESPONSES_REDIRECT_TO_SCENERIO,UPDATE_RESPONSES_REDIRECT_TO_BOT
} from "./graphql/mutations";
import OptionsModel from './modals/optionsModel';

import { SelectedCategoryContext } from './contexts/selectedCategoryContext';

export default function Redirectmodal({blockId,challengeId,responseId,botChatid}) {
    const [updateResponsesBlockRedirect ] = useMutation(UPDATE_RESPONSES_REDIRECT_TO_BLOCK);
    const [updateResponsesBotRedirect ] = useMutation(UPDATE_RESPONSES_REDIRECT_TO_BOT);
    const [updateResponsesScenerioRedirect ] = useMutation(UPDATE_RESPONSES_REDIRECT_TO_SCENERIO);
    const [selectedCategoryContext , setSelectedCategoryContext] = useContext(SelectedCategoryContext);

    const [showRedirect , setShowRedirect] = useState({
        url : false,
        block : true,
        ai:false,

    })
    const[selected ,setSelected] = useState({
        scenerio : "" ,
        block : "",
        bot: ""
    })
    const [redirectTO , setRedirectTo] = useState({
        userClick : "",
        block : "",
        ai:"",
        url:""
    })
    // let prevChallengeName = selectedCategoryContext.challenge?selectedCategoryContext.challenge:false

    const { loading, error, data } = useQuery(CHALLENGES_FILTER_CHALLENGEID,{
        variables:{challengeId:selectedCategoryContext.challenge.id},
    });
    let scenerioData = []
    let blockData = []
    let botData = []
    let selectedScenerioData = []
    let selectedBlockData = [] 
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
    if(!error){
        if(data.challenges.edges.length>0){
            if(data.challenges.edges[0].node.challengeScenerio.edges.length>0){
                scenerioData = data.challenges.edges[0].node.challengeScenerio.edges
            }
        }
    }
    
    // filter scenerio Data 
    if(scenerioData.length>0){  
        selectedScenerioData = scenerioData.filter(function (item) {
            return item.node.scenerioId === selected.scenerio;
        });
    }
    // get blocks
    if(selectedScenerioData.length>0){
        if(selectedScenerioData[0].node.scenerioBlocks.edges.length>0){
            blockData = selectedScenerioData[0].node.scenerioBlocks.edges
        }

    }

    // filter bot data 
    if(blockData.length>0){
        selectedBlockData = blockData.filter(function (item) {
            return item.node.blockId === selected.block;
        });
    }

    // get bot data 
    if(selectedBlockData.length>0){
        if(selectedBlockData[0].node.botBlock.edges.length>0){
            botData = selectedBlockData[0].node.botBlock.edges
        }
    }
    



    function handleRedirectButton(e){
        if(e.target.id==="redirect-block"){
            setShowRedirect({
                block:true,
                ai:false,
                url:false,
            })
        }
        if(e.target.id==="redirect-ai"){
           setShowRedirect({
               block:false,
               ai:true,
               url:false,
           })
       }
       if(e.target.id==="redirect-url"){
           setShowRedirect({
               block:false,
               ai:false,
               url:true,
           })
       }
    }
    function handleSubmit(e){
        e.preventDefault();
        

        
    }

   

    function handleSelection(e){
        if(e.target.name==="scenerio"){
            setSelected({...selected,scenerio:e.target.value})
            if(responseId && e.target.value){
                updateResponsesScenerioRedirect({ variables: { responseId: responseId,
                    redirectToScenerio: e.target.value,
        
                    } });
        
            }

        }
        else if(e.target.name==="block"){
            setSelected({...selected,block:e.target.value})
            if(responseId && e.target.value!==""){
                updateResponsesBlockRedirect({ variables: { responseId: responseId,
                    // redirectToBot :selected.bot,
                    redirect:e.target.value,
                    // redirectToScenerio: selected.scenerio,
        
                    } });
            }

        }
        else if(e.target.name==='bot'){
            
            if(responseId!=="" && e.target.value!==""){
                updateResponsesBotRedirect({ variables: { responseId: responseId,
                    redirectToBot :e.target.value,
        
                    } });
            }
            setSelected({...selected,bot:e.target.value})

        }

    }
    function handleChange(e){
        if(e.target.name==="userClick"){
            setRedirectTo({...redirectTO,userClick:e.target.value})
        }
        else if(e.target.name==="url"){
            setRedirectTo({...redirectTO,url:e.target.value})
        }

    }
    
    
   
    console.log(selectedCategoryContext.challenge.id)
    
    return (
        <div>
            {/* <OptionsModel open={true}> */}
            <form >
                <div id="redirectBox">
                {/* <input type="submit" onSubmit={handleSubmit}/> */}
                <button onClick={handleSubmit} >submit</button>


                        <label>
                            if user clicks : 
                        </label>
                        <div>
                            <input type='text' name='userClick' value={redirectTO.userClick} onChange={handleChange}/>
                        </div>
                        <div>
                            <button id="redirect-block" onClick={handleRedirectButton}>Blocks</button>
                            <button id="redirect-ai" onClick={handleRedirectButton}>AI</button>
                            <button id="redirect-url" onClick={handleRedirectButton}>URL</button>
                        </div>
                
                        <div style={{display:showRedirect.block?"block":"none"}}>
                            <div>
                                <label>redirect to block</label>
                            </div>
                                <select name="scenerio" onChange={handleSelection}>
                                    <option value="">select scenerio</option>
                                    {
                                        scenerioData.length>0?
                                        scenerioData.map(scenerio=>(
                                            <option value={scenerio.node.scenerioId}>
                                                {scenerio.node.name}
                                            </option>
                                        )):
                                        <option value="">no scenerios</option>
                                    }
                                </select>
                                <select name="block" onChange={handleSelection}>
                                    <option value="">select block</option>
                                    {
                                        selected.scenerio&&blockData.length>0?
                                        
                                        blockData.map(block=>(
                                            <option value={block.node.blockId}>
                                                {block.node.name}
                                            </option>
                                        )):
                                        <option value="">no Blocks</option>
                                    }
                                </select>

                                <select name="bot" onChange={handleSelection}>
                                    <option value="">select bot chat</option>
                                    {
                                        selected.block&&botData.length>0?
                                        botData.map(bot=>(
                                            <option value={bot.node.botChatId}>
                                                {bot.node.botChatId}
                                            </option>
                                        )):
                                        <option value="">no bot chats </option>
                                    }                                
                                </select>
        
                
                    
                        </div>
                        <div style={{display:showRedirect.ai?"block":"none"}}>
                            <div>
                                <label>use AI  </label>
                            </div>
             
                        </div>

                        <div  style={{display:showRedirect.url?"block":"none"}}>
                            <div>
                                <label>open URL</label>
                            </div>
                            <div>
                                <input type="input" name="url" value ={redirectTO.url} onChange={handleChange}/>
                            </div> 
                        </div>

                    
                    

                </div>
            </form>
            {/* </OptionsModel> */}
            
        </div>
    )
}
