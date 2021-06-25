import React from 'react'
import { useState , useContext,useEffect} from "react";
// import { useQuery, ApolloConsumer } from '@apollo/client';
// import {ALL_CHALLENGES} from "../components/graphql/queries";
// import { Table, Button } from '@material-ui/core';
import {useParams} from "react-router-dom";

// import { useLazyQuery } from '@apollo/client';

import { Tabs,Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"
// import InputText from './inputext';
// import UploadImage from './uploadImage';
// import UpdateChallengeData from './updates/updateChallenges';
// import DisplayAHnnyAppTable from './displayTable';
import PointDistribution from '../pointSystem/pointDistribution';
import PointToCash from '../pointSystem/pointsToCash';
import PointsMaximum from '../pointSystem/pointsMaximum';
import PointManagement from './pointManagement';


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
      },
      tabContent: {
          margin: 10
      }
    
  }))

  
  
function PointSystem({search,addModify}) {

    const [tabValue, setTabValue] = useState('초미ㅣ두');


    const classes  = useStyles()

    const {fk}=useParams()





    const handleChange = (event, newValue) => {
        setTabValue(newValue);

    };


     return (
        <div className="wrapper">
            
            <div className={classes.root}> 
           
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleChange}
                    // label="challenge"
                    className={classes.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                    >      
                    <Tab label={'point Distribution '} value={'PointDistribution'}/>
                    <Tab label={'maximum points'} value={'PointsMaximum'}/>
                    <Tab label={'points to  cash'} value={'PointToCash'}/>
                    <Tab label={'user points'} value={'pointsManagement'}/>

                </Tabs>
                {
                   tabValue==='PointDistribution'&&
                    <div className={classes.tabContent}>
                        <PointDistribution/>
                    </div>
                }
                {
                   tabValue==='PointsMaximum'&&
                    <div className={classes.tabContent}>
                        <PointsMaximum/>
                    </div>
                }
                
                {
                   tabValue==='PointToCash'&&
                    <div className={classes.tabContent}>
                        <PointToCash/>
                    </div>
                }
                {
                   tabValue==='pointsManagement'&&
                    <div className={classes.tabContent}>
                        <PointManagement/>
                    </div>
                }


                
            </div>
        

  
            
 
        </div>
        
     )
     
     
}



export default  PointSystem