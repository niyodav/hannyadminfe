import React from 'react';
import { useState,useEffect,useContext } from "react";
import { useQuery } from '@apollo/client';
import {CHALLENGE_GROUPS} from "./graphql/queries";
import DisplayTable from './displayTable';
import {useParams,useLocation,useHistory,Link} from "react-router-dom";
import CreateChallengeGroup from './createChallengeGroup';
import UpdateChallengeGroup from './updateChallengeGroup';
import DeleteChallengeGroup from './deleteChallengeGroup';

import { UpdateContext } from './contexts/updateContext'
import { DeleteIdsContext } from './contexts/deleteIdsContext';

import { TableSortContext } from './contexts/sortByContext'
import { makeStyles } from "@material-ui/core/styles"
import { CategoryContext } from './contexts/categoriesContext'
import { LocationContext } from './contexts/locationContext'
import { SelectedMenuContext } from './contexts/selectedMenuContext';


const useStyles = makeStyles((theme) => ({
    upperLinks:{
        textDecoration: 'none',
        color :"black",
        fontSize:20,
        fontFamily:"Nanum Square Regular",
      "&:hover": {
        color: "#ff8000"
        }
    }
    
  }))
function DisplayChallengesGroups({search}) {
    const classes  = useStyles()

    const [updateCategory , setUpdateCategory] = useContext(UpdateContext);
    const [DeleteIdsCategory , setDeleteIdsCategory] = useContext(DeleteIdsContext);
    const deleteIds = Object.keys(DeleteIdsCategory.challengeGroup)
    const [sortBy , setSortBy] = useContext(TableSortContext);
    const [newCategory , setNewCategory] = useContext(CategoryContext);
    const [locationContext , setLocationContext] = useContext(LocationContext);
    const location = useLocation()
    const [selectedMenu , setSelectedMenu] = useContext(SelectedMenuContext);

    const { loading, error, data,refetch } = useQuery(CHALLENGE_GROUPS,{

        variables:{orderBy:sortBy.sortBy},
        // fetchPolicy:"cache-and-network",


        // pollInterval:600000,
    });
    useEffect(() => {

        refetch()
        setLocationContext({...locationContext,challengeGroup: location.pathname})
        return () =>{
            setNewCategory({
                ...newCategory,challengeGroup:false
            });
            setUpdateCategory({
                ...updateCategory,challengeGroup:false
            });
            // setSelectedMenu({
            //     ...selectedMenu,challengeGroup:{id:false,action:false}
            // });
            
        }


    },[newCategory.challengeGroup,
        updateCategory.challengeGroup,
        selectedMenu.challengeGroup.id]);
   

   
    console.log(locationContext)
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>there was an error</p>;
    console.log(selectedMenu)
  
     return (

         <div className="wrapper">
             <div>
                    <h1>
                        <img src={"https://hanny-uploads.s3.amazonaws.com/USER/UPLOADS/%E1%84%83%E1%85%A2%E1%84%92%E1%85%AA%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.png"} alt="increment" style={{width:20,height:20,marginRight:10, marginLeft:10}}/>    
                        <Link to = '/' className={classes.upperLinks}>대화관리</Link>
                    </h1>
                </div>
              
            <div className="display-table">
                    <DisplayTable data={data.challengeGroups.edges} 
                        fields={{id:'challengeId',name:'name',title:"해피 챌린지 그룹명",nextTableTitle:"해피 챌린지 수",path:"challenge",nextTotalCount:"groupChallenge"}}
                        contextKey={"challengeGroup"}
                        
                    />
                    <CreateChallengeGroup/>
            </div>

        {
            updateCategory.challengeGroup&&
            <UpdateChallengeGroup data={{challengeId:updateCategory.challengeGroup.id,
                name:updateCategory.challengeGroup.content}} 
            />
            
        }
        {  
        selectedMenu.challengeGroup.action&&selectedMenu.challengeGroup.action==="delete"&&

                    
                    <DeleteChallengeGroup data={{challengeId:selectedMenu.challengeGroup.id}}/>
            
        }
        
        </div>
        
     )
     
}

export default DisplayChallengesGroups