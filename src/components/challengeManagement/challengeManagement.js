import React from 'react'
import { useState,useRef,useContext } from "react";

import { Table,TableBody,TableCell,TableHead,TableRow, Paper, Button, TextField,  } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Link,Switch, Route} from 'react-router-dom';
import { TableSortContext } from '../contexts/sortByContext'
import { UpdateContext } from '../contexts/updateContext'
import { useQuery } from '@apollo/client';
import {CHALLENGES_MANAGEMENT} from "../graphql/queries";
import { DeleteIdsContext } from '../contexts/deleteIdsContext'

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary    },
    table: {
        minWidth: 1000,
    },
    submitTableActions:{
        margin:"5px",
    },
    showSubmitTableActions:{
        display:'none'
    },
    actionButton:{
        float:'right',        margin:5,
        borderRadius:7,
        borderColor:"#3f51b5",
        backgroundColor:"#ffff"


    },
    tableRow:{
        background:""
    },
    action:{
        margin:5
    },
    Table:{
        borderCollapse: "collapse",
        width: "100%",
        padding:10,
        

    },
    tableTdTh:{
        // padding: "25px 25px 25px 25px  25px",
        // fontSize:"15px",
	
        // fontWeight: "normal",
        padding: "8px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
    },

  }));

function DisplayChallengeManagement() {
    
    const classes = useStyles();
    const [checked,setChecked] = useState(false)
    const [currentAction,setCurrentAction] = useState('')

    const [sortBy , setSortBy] = useContext(TableSortContext);
    const [updateCategory , setUpdateCategory] = useContext(UpdateContext);
    const [deleteIdsCategory , setDeleteIdsCategory] = useContext(DeleteIdsContext);

    const [modifiedvalue , setModifiedValue] = useState({
        action: '',
        id :'',
        content:''  
    });

    const { loading, error, data } = useQuery(CHALLENGES_MANAGEMENT,{
  
        // pollInterval:600000,
    });

   

    const index = useRef(0);



    function handleActionClick(e){
        setCurrentAction('edit');
     
    }


  function checkedBox(e,id){

      if(e.target.checked){
 
        
        setChecked({...checked,
            [id]:true
        })
        
      }
      else{
          delete checked[id]

      }

      
 
  }


  function handleOnChange(e,id,fieldName){

    setModifiedValue({
        action: currentAction,
        id : id,
        content:e.target.value,
        fieldName : fieldName ? fieldName : false
    })



 }
//  function handleOnBlur(){
//     if(modifiedvalue.content){
//         setUpdateCategory({...updateCategory,[]:modifiedvalue})

   
//     }
// }




// function deleteSelected(e){
//     alert("삭제하겠습니까 ?")
//     setDeleteIdsCategory({...deleteIdsCategory,[contextKey]:checked})
   
//  }

 function handleSorting(e,field){
     if (sortBy.sortBy!==field){
        setSortBy({
            sortBy :field
        })
        }
    else{
        setSortBy({
            sortBy :"-"+field
        })
    }
 }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
    console.log(data)
     return (


        <div classes="wrapper">
            <div>
                {/* {
                    checked!==false &&
                        <div>
                            <Button type="submit"  variant="contained" className={classes.action}
                            color ="primary" value="Submit" onClick={deleteSelected}>삭체</Button>
                            <Button   variant="contained"  
                            color ="primary" onClick={handleActionClick}>수정</Button>
                        </div>
                }    */}
                <table style={{width:"80%"}} className={classes.Table}>
                    <tr>
                        <th className={classes.tableTdTh}></th>
                        <th className={classes.tableTdTh}> 구분 </th>
                        <th onClick={(e)=>{handleSorting(e,"name")}} style={{cursor:"pointer"}}> 
                            {/* <button onClick={(e)=>{handleSorting(e,"name")}}> */}
                                {
                                    sortBy.sortBy && sortBy.sortBy[0]==="-"?
                                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/up-arrow.png"} alt="increment" style={{width:20,height:20}}/>
                                    :
                                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/down-arrow.png"} alt="decrement" style={{width:20,height:20}}/>

                                }

                                HC
                            {/* </button> */}
                        </th>
                        <th className={classes.tableTdTh}>
                        리워드(H.P)
                        </th>
                        <th onClick={(e)=>{handleSorting(e,"last_updated")}} style={{cursor:"pointer"}}>
                            {/* <button onClick={(e)=>{handleSorting(e,"last_updated")}}> */}
                                {/* {
                                    sortBy.sortBy && sortBy.sortBy[0]==="-"?
                                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/up-arrow.png"} alt="increment" style={{width:20,height:20}}/>
                                    :
                                    <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/down-arrow.png"} alt="decrement" style={{width:20,height:20}}/>

                                } */}
                                기본정보
                            {/* </button> */}
                        </th>
                        <th className={classes.tableTdTh}> 상세설명 </th>
                        <th className={classes.tableTdTh}> 코드번호 </th>
                        <th className={classes.tableTdTh}> 앱노출 </th>
                        <th className={classes.tableTdTh}> 업데이트일시 </th>
                        <th className={classes.tableTdTh}> 주말설정 </th>
                    </tr>

{
    data.challenges.edges.map(row =>(
              


        <tr style={checked[row.node["challengeId"]]?{background:"#BEBEBE"} :null}>
            <td className={classes.tableTdTh} >
                <input type="checkbox" name="checkbox" value={row.node["challengeId"]}  onClick={(e)=>{checkedBox(e,row.node["challengeId"])}}
                />
            </td>
            <td className={classes.tableTdTh} >
                {index.current+=1}
            </td>
            
            <td className={classes.tableTdTh} >
                {
                    checked[row.node["challengeId"]] && currentAction==="edit" ?
                    <TextField
                    placeholder={row.node["name"]}
                    onChange={(e)=>{handleOnChange(e,row.node["challengeId"],currentAction,"name")}}
                    value={modifiedvalue.id===row.node["challengeId"] ? modifiedvalue.content : ''} 
                    // onBlur={handleOnBlur}
                    />
                    :
                    row.node["name"]
                    
                }
            </td>
            <td className={classes.tableTdTh} >
                300,000
            </td>
            <td key={row.node["challengeId"]}>
                {/* <Link to={"gc/"+row.node["challengeId"]}>
                    {row.node.lastUpdated?row.node.lastUpdated.slice(0,16).replace("T"," "):null}
                </Link> */}
            </td>

        </tr>
    ))
}

                    
                </table>
            </div>





        
        </div>

    )
 }
export default DisplayChallengeManagement








