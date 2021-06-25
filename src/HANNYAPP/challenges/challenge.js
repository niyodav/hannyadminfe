import React from 'react'
import { useState , useContext,useEffect} from "react";
import { useQuery, ApolloConsumer } from '@apollo/client';
import {ALL_CHALLENGES} from "../../components/graphql/queries";
import { Table, Button } from '@material-ui/core';
import {useParams} from "react-router-dom";

import axios from 'axios'; 

import { Tabs,Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"
import InputText from '../inputext';
import UpdateChallengeData from '../updates/updateChallenges';
import UploadImage from '../../components/uploadImage';
import { API_BASE_URL } from '../../globalConstants';


const useStyles = makeStyles((theme) => ({
    upperLinks:{
        textDecoration: 'none',
        color :"black",
        fontSize:20,
        fontFamily:"Nanum Square Regular",
      "&:hover": {
        color: "#ff8000"
        }
    },
    extend: {
        marginLeft: 50,
        // background: 'red'
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // height: 400,
        marginLeft: 20
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
      field: {
          marginTop: 30,
          width: "80%"
      }
    
  }))

  

  function submitForm(contentType, data, setResponse) {
    axios({
        
    url: `${API_BASE_URL}/api/v1/botchats/upload/`,
    method: 'POST',
    data: data,
    headers: {
    'Content-Type': contentType
    }
    }).then((response) => {
    setResponse(response.data);
    }).catch((error) => {
    setResponse("error");
    })
   }
  
function ChallengeControl({search,addModify}) {

    const [tabValue, setTabValue] = useState('초미ㅣ두');


    const classes  = useStyles()

    const {fk}=useParams()

    const [item,setItem] = useState(false);


    const [fileData  , setFileData] = useState({
        content: false
    });
    function addItem(value){
        
        setItem(value)
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);

    };

    useEffect(() => {
        refetch()
         if (fileData.content){

            const formData = new FormData();
    
            formData.append("upload", fileData.content);
            formData.append("uploadType", String(fileData.formData.uploadType));
            
    
                
    
    
            submitForm("multipart/form-data", formData, (msg) => {
                console.log(msg)
               
            });

        }
        
      


    },[item]);


    function addFile(item){
        setFileData(item)
    }


    const { loading, error, data,refetch } = useQuery(ALL_CHALLENGES);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;


     return (
        <div className="wrapper">
    

            <div className={classes.root}>  
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChange}
                    label="challenge"
                    className={classes.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                    >        
                    {    
                    
                        data.challenges.edges.map(row=>(
                                <Tab label={row.node.name} value={row.node.challengeId}/>
                            ))
                    }

                </Tabs>

                <div>

                    {
                        data.challenges.edges.map(row=>(
                            row.node.challengeId===tabValue&&
                                <div style={{marginLeft:40}} >
                                    <div>{row.node.name}</div>

                                    <div className={classes.field}>
                                        <InputText label={'colors'}
                                        defaultValue={row.node.colors}
                                        type='text'
                                        addItem={addItem}
                                        />
                                    </div>
                    
                                    
                    
                                    <div className={classes.field}>
                                    
                                        <InputText label={'description'}
                                        defaultValue={row.node.description}
                                        type='text'
                                        addItem={addItem}
                                        />
                                    </div>
                    
                                    <div className={classes.field}>
                                        <InputText label={'period'}
                                        defaultValue={row.node.period}
                                        type='number'
                                        addItem={addItem}/>
                                    </div>
                                    <div className={classes.field}> 
                                        <InputText label={'percentage'}
                                        defaultValue={row.node.percentage}
                                        addItem={addItem}/>
                                    </div>
                                    <div className={classes.field}>
                                        <InputText label={'price'}
                                        defaultValue={row.node.price}
                                        type='number'
                                        addItem={addItem}/>
                    
                                    </div> 

                                    <div style={{flex:1, flexDirection:'row'}} >
                                   
                                        <div>main  image</div> 
                                        <div><UploadImage addFile={addFile}/></div>

                                    </div>

                                    <div  className={classes.field}>
                                    </div>

                                 

                                    {
                                        item&&
                                        <UpdateChallengeData data={{...row.node, [item.name]:item.content}}/>
                                    }
  


                                    
                            </div>
                        ))
                    }
                </div>
            </div>
            
 
        </div>
        
     )
     
     
}



export default  ChallengeControl