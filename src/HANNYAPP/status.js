import React from 'react'
import { useState , useContext,useEffect} from "react";
import { useQuery, ApolloConsumer } from '@apollo/client';
import {ALL_MESSAGES} from "../components/graphql/queries";
import {useParams} from "react-router-dom";

import { useLazyQuery } from '@apollo/client';


import { makeStyles } from "@material-ui/core/styles"


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
    }
    
  }))

  
  
function DisplayStatus({search,addModify}) {



    const classes  = useStyles()

    const {fk}=useParams()

    // useEffect(() => {
    //     // refetch()
    //     setLocationContext({...locationContext,challenge: location.pathname})
    //     return () =>{
    //         setNewCategory({
    //             ...newCategory,challenge:false
    //         });
    //         setUpdateCategory({
    //             ...updateCategory,challenge:false
    //         });

            
            
    //     }

    // },[newCategory.challenge,updateCategory.challenge,selectedMenu.challenge.id]);



    const { loading, error, data,refetch } = useQuery(ALL_MESSAGES);

  

    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
    


     return (
         <div className="wrapper">
             <h1 style= {{marginLeft: 20, marginTop: 20}}>STATS</h1>

             <div style= {{marginLeft: 20, marginTop: 20}}>
                 
                 <div>
                     online users
                 </div>
                 <div className = {classes.extend}>
                     <div>hanny</div>
                     <div>test01</div>
                 </div>
                 <div>
                     completed {((data.allMessages.edges[data.allMessages.edges.length-1].node.lastIdx)/938)*100} %
                 </div>
                 
                 <div>
                     last  10 messages
                 </div>
                 <div>
                     <div>hanny</div>
                     <div className = {classes.extend}>
                        {
                            data.allMessages.edges.map(row =>(
                                row.node.user.username==='hanny'&&<div>
                                    {row.node.message}
                                </div>

                            ))
                        }
                         
                    </div>

                     <div>test01</div>
                     <div className = {classes.extend}>

                     {
                            data.allMessages.edges.map(row =>(
                                row.node.user.username==='test01'&&<div>
                                    {row.node.message}
                                </div>

                            ))
                        }
                     </div>
                 </div>
             </div>
             
 
        </div>
        
     )
     
     
}



export default  DisplayStatus