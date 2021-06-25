import React from 'react'
import { Button,TextField} from "@material-ui/core";
import { useState ,useContext} from "react";
import uuid from "uuid";
import { CategoryContext } from './contexts/categoriesContext'


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    textInput: {
        // border:"1px solid red",   
        
    "& .MuiFormLabel-root": {  
      color: "#ff8000",
      
    },
    // "& .MuiInputBase-input": {
    //     //  MuiOutlinedInput-input

    //     // color: "red",
    //     border:"1px solid red",
    //   }

  }
}));
function CreateCategory({addItem,label,addAdded,category}) {
    const classes = useStyles();

    const [item,setItem] = useState({
        id : "",
        name:"",
        fk:''
    });
const [display,setDisplay] = useState('none')
const [added,setAdded] = useState(false)

const [newCategory , setNewCategory] = useContext(CategoryContext);


    function handleInputChange(e){
        setItem({...item, 
            name:e.target.value,
         });
        }
    function handleSubmit(e){
        e.preventDefault();
        if(item.name.trim()){
            // addItem takes id and name parameters to be used  for mutation

            addItem({ ...item, id: uuid.v4() });
            setItem({ ...item, name: "" });
            setDisplay('none')
            
        }

    }
    function handleClick(e){
        setDisplay('block')
        setAdded(true)
        

    }
    function handleOnBlur(e){

        e.preventDefault();
        if(item.name.trim()){
            // addItem takes id and name parameters to be used  for mutation
            setNewCategory({...newCategory,[category]:{...item,id: uuid.v4()}})

            addItem({ ...item, id: uuid.v4() });
            // addAdded(added)
            setItem({ ...item, name: "" });
            setDisplay('none')
            setAdded(false)
        }
    }
console.log(newCategory)
    return (
        
        <div className="wrapper">
            <form onSubmit={handleOnBlur}>
                <TextField
                variant="outlined"
                id="standard-multiline-flexible"
                type='text'
                label={label}
                value ={item.name}
                onBlur={handleOnBlur}
                InputProps={{ style: {fontFamily:"NanumSquare"} }} 
                className={classes.textInput}
                onChange={handleInputChange}                 
                style={{display:display}}
                />
                 <Button  onClick={handleClick} className="add-button"> + add</Button>         

            </form>
        </div>
        
    )
}
export default CreateCategory