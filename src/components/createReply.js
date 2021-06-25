import React from 'react'
import { useState ,useContext,useEffect} from "react";
import {useMutation } from '@apollo/client';

import {CREATE_RESPONSES} from "./graphql/mutations";
import { Button, Modal } from '@material-ui/core';
import UploadFiles from './features/createFiles';
import CreateText from './features/createText';
import Redirectmodal from './Redirectmodal';
import { makeStyles } from '@material-ui/core/styles';
import { CreatedtextContext } from './contexts/createdTextContext'
import OptionsModel from './modals/optionsModel';

const useStyles = makeStyles((theme) => ({
    replyButton: {
        // textDecoration: 'none',
        backgroundColor:"#ffdd89ff",
        borderRadius:20,
     }

    }));
function CreateReply({fk,displays}) {
    const classes = useStyles();

    const [createReply ] = useMutation(CREATE_RESPONSES);
    const [buttonClicked, setButtonClicked] = useState(false)
    const [text , setText] = useContext(CreatedtextContext);

 



    const [replyButton , setReplyButton] = useState("none")

  

    function handleClick(e){
        setButtonClicked(true)


    }

    function handleReplyClick(e){
        setReplyButton('block')
                
    }
    function handleOnMouseLeave(){
        setReplyButton("none")
    }

     return (
        <div >
            <div>
                <Button variant ="contained"  onClick={handleReplyClick}  className={classes.replyButton} >+ REPLY</Button>
                <div style={{display:replyButton}} >
                    {
                    displays.file ? 
                        <UploadFiles /> 

                        :
                        <CreateText replyFk={fk} label={"quick reply"}/>
                    }  
                    <div>
                        <Button onClick={handleClick}>+ (Optional)</Button>
                    </div> 
                    {
                        buttonClicked&&<Redirectmodal responseId={''} />
                    
                    }
                
                </div>
            </div> 
        </div> 

    )

}
export default CreateReply




