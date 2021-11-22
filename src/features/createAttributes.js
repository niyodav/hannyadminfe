import React from 'react'
import { Button,TextField,Drawer, Typography, List,ListText, ListTextText ,Container} from "@material-ui/core";
import { useState } from "react";
import uuid from "uuid";




function CreateAttribute({addText,category}) {
    const [text,setText] = useState({
        content:"",
        category:"",
        pk:""
    });

    function handleInputChange(e){
        setText({...text, 
            content:e.target.value,
         });
        }
    function handleSubmit(e){
        e.preventDefault();
        if(text.content.trim()){
            addText({ ...text,pk:uuid.v4(),category:category});
            setText({ ...text,pk:"", content: "" });
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <Button>save to </Button> 
                <Button>choose fields</Button>
                <Button></Button>
                <TextField
                label="text field"
                type='text'
                name='text'
                value ={text.content}
                onChange={handleInputChange}
                
                />

            </form>
            
        </div>
    )
}
export default CreateAttribute