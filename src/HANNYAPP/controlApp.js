import React from 'react'
import { useState , useContext,useEffect} from "react";
import { useQuery, ApolloConsumer } from '@apollo/client';
import {ALL_CHALLENGES} from "../components/graphql/queries";
import { Table, Button } from '@material-ui/core';
import {useParams} from "react-router-dom";

import { useLazyQuery } from '@apollo/client';

import { Tabs,Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"
import InputText from './inputext';
import UploadImage from './uploadImage';
import UpdateChallengeData from './updates/updateChallenges';
import DisplayAHnnyAppTable from './displayTable';
import PointDistribution from './pointSystem/pointDistribution';
import PointToCash from './pointSystem/pointsToCash';
import PointsMaximum from './pointSystem/pointsMaximum';
import PointSystem from './pointSystem/main';
import ChallengeControl from './challenges/challenge';


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
          marginTop: 30
      }
    
  }))

  
  
function ControlApp({search,addModify}) {

    const [tabValue, setTabValue] = useState('challenges');


    const classes  = useStyles()

    const {fk}=useParams()

    const [item,setItem] = useState(false);



    function addItem(item){
        
        setItem(item)
    }

    const handleChange = (event, newValue) => {
        setTabValue(newValue);

    };

    // useEffect(() => {
    //     // console.log(item)
    //     refetch()
    //     return ()=>(
    //         setItem(false)
    //     )


    // },[item]);

    function fieldsToUpdate(node,item){

        if([node]==[item]){
            return {item}

        }



    }


    const { loading, error, data,refetch } = useQuery(ALL_CHALLENGES);

  console.log(item)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
if(item){
    
    console.log({[item.name]: item.content})

}

     return (
        <div className="wrapper">
            <h1 style= {{marginLeft: 20, marginTop: 20}}>app control center </h1>
           
            <Tabs
                    orientation="horizontal"
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChange}
                    label="challenge"
                    className={classes.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                    >      
                    <Tab label={'challenges'} value={'challenges'}/>
                    <Tab label={'points'} value={'points'}/>

                </Tabs>
                {
                    tabValue==='challenges'&&
                    <ChallengeControl/>
                }
                {
                    tabValue==='points'&&
                    <PointSystem/>
                }

                {/* <PointSystem/> */}
            <div className={classes.root}>  
                {/* <Tabs
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

                </Tabs> */}
{/* 
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

                                    <div className={classes.field} >
                                        <UploadImage label={"click to upload challenge's main image"}/>
                                    </div>
                                    <div  className={classes.field}>
                                        <UploadImage label={"click to upload  challenge's second image"}/>
                                    </div>

                                    <PointDistribution/>
                                    <PointsMaximum/>

                                    {
                                        item&&
                                        <UpdateChallengeData data={{...row.node, [item.name]:item.content}}/>
                                    }
  


                                    
                            </div>
                        ))
                    }
                </div> */}
            </div>
            
 
        </div>
        
     )
     
     
}



export default  ControlApp