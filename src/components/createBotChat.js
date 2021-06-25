import React from 'react'
import { useState,useContext,useEffect } from "react";
import {useMutation } from '@apollo/client';
import {CREATE_BOT_CHATS,UPDATE_BOTUPLOADS} from "./graphql/mutations";
import { Button } from '@material-ui/core';
import UploadFiles from './features/createFiles';
import CreateText from './features/createText';
import { FieldsOnCorrectTypeRule } from 'graphql';
import { CreatedtextContext } from './contexts/createdTextContext'
import { SelectedFeatureContext } from './contexts/featuresContext'


function CreateBotChat({blockFk,displays}) {
    const [createBotChat] = useMutation(CREATE_BOT_CHATS);
    const [text , setText] = useContext(CreatedtextContext);
    const [selectedfeature , setSelectedfeature] = useContext(SelectedFeatureContext);

    const [items ,setItems] = useState({
        content:"",
        category:"",
        pk:"",
        });
    const [files ,setFiles] = useState({
        content:"",
        category:"",
        pk:"",
        uploadType:""
        });
    const [botButton , setBotButton] = useState('none')


    function addItem(item){
    setItems(item);
    }

    function addFile(file){
        setFiles(file);
        }
    function handleBotClick(e){
        setBotButton('block');
                
    }
    
  
     return (
        <div>
            <div>
                <div>
                    {
                        selectedfeature && selectedfeature!=="text" ? 
                        <UploadFiles addFile={addFile} uploadType={selectedfeature} blockId={blockFk}/> 
                        :
                        <CreateText addText={addItem} label={"bot chat"}/>
                        
                    }  
              
                </div>
            </div>

        </div> 

    )

}
export default CreateBotChat 



