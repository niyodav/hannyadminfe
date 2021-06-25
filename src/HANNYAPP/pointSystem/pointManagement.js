import React from 'react'
import { useState , useContext,useEffect} from "react";
import { useQuery, ApolloConsumer } from '@apollo/client';
import {POINT_MANAGEMENT} from "../../components/graphql/queries";
import { Table, Button } from '@material-ui/core';
import {useParams} from "react-router-dom";

import { useLazyQuery } from '@apollo/client';

// import { Tabs,Tab } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"
import DisplayAHnnyAppTable from '../displayTable';
// import InputText from './inputext';


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

  
  
function PointManagement({search,addModify}) {



    const classes  = useStyles()

    const {fk}=useParams()

    const [item,setItem] = useState(false);



    function addItem(item){
        
        setItem(item)
    }



    useEffect(() => {
        // console.log(item)
        refetch()
        return ()=>(
            setItem(false)
        )


    },[item]);




    const { loading, error, data,refetch } = useQuery(  );

//   console.log(data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
    // console.log(data)

     return (
        <div className="wrapper">
            <DisplayAHnnyAppTable data = {data.pointManagement.edges} fields={{id:'pointsId'}}/>

       
        </div>
        
     )
     
     
}



export default  PointManagement