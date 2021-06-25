import React from 'react'
import { TextField} from "@material-ui/core";
import { useState } from "react";
import uuid from "uuid";


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    textInput: {
        width:400,
        
    "& .MuiFormLabel-root": {  
      color: "#ff8000",
      
    },


  }
}));
function InputText({addItem,label,defaultValue,type}) {
    const classes = useStyles();

    const [item,setItem] = useState({
        id : "",
        content:"",
        name:label
    });



    function handleInputChange(e){
        setItem({...item, 
            content:e.target.value,
         });
        }


    function handleOnBlur(e){

        e.preventDefault();
        if(item.content.trim()){
        
            addItem({ ...item, id: uuid.v4() });
            setItem({ ...item, content: "" });
            
        }
    }
    return (
        
        <div className="wrapper">
            <form onSubmit={handleOnBlur}>
                {
                    type==='text'?
                    <TextField
                    variant="outlined"
                    id="standard-multiline-flexible"
                    type='text'
                    multiline={true}
                    label={label}
                    value ={item.content ? item.content : defaultValue }
                    onBlur={handleOnBlur}
                    className={classes.textInput}
                    onChange={handleInputChange}  
                    />
                    :
                    <TextField
                    variant="outlined"
                    id="standard-multiline-flexible"
                    type='number'
                    label={label}
                    value ={item.content ? item.content : defaultValue }
                    onBlur={handleOnBlur}
                    className={classes.textInput}
                    onChange={handleInputChange}  
                    />
    
                }
  



            </form>
        </div>
        
    )
}
export default InputText