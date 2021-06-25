import React from 'react'
import {TextField, Button} from "@material-ui/core";
import { useState, useContext,useEffect } from "react";
import uuid from "uuid";
import Redirectmodal from '../Redirectmodal';

import { CreatedtextContext } from '../contexts/createdTextContext';



function CreateText({addText,category,label,replyFk}) {
    const [textChange,setTextChange] = useState({
        content:"",
        category:"",
        pk:""
    });

    const [text , setText] = useContext(CreatedtextContext);
    useEffect(() => {
        // console.log('passed here ')
    
 
    },[text.reply]);
    // const [textChange , setTextChange] = useState('');


    // function handleInputChange(e){
    //     setTextChange(e.target.value,
    //      );
    //     }
    // // function handleSubmit(e){
    // //     e.preventDefault();
    // //     if(text.content.trim()){
    // //         addText({ ...text,pk:uuid.v4(),category:category});
    // //         setText({ ...text,pk:"", content: "" });
    // //     }

    // // }

    // function handleOnBlur(e){
    //     e.preventDefault();
    //     if(textChange.trim()){
    //         setText({ pk:uuid.v4(),content:textChange,category:category});

    //     }
    // }


    function handleInputChange(e){
        setTextChange({...textChange, 
            content:e.target.value,
         });
        }

    function handleOnBlur(e){
        e.preventDefault();
        if(textChange.content.trim()){
            if (replyFk){
                setText({ ...text,reply:{content:textChange.content,pk:uuid.v4(),fk:replyFk}});

                 setTextChange({ ...textChange,pk:"", content: "" });
            }
            else{
                setText({ ...text,content:textChange.content,pk:uuid.v4(),category:category});

                setTextChange({ ...textChange,pk:"", content: "" });

            }
        }
    }
// console.log(text)
    return (
        <div>
            <TextField
            variant="outlined"
            id="standard-multiline-flexible"
            multiline
            type='text'
            name='text'
            label={label}
            value ={textChange.content}
            onBlur={handleOnBlur}
            style={{background:"#FFF"}}
            onChange={handleInputChange}
            
            />
 
        </div>
    )
}
export default CreateText







