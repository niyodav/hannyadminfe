import React,{useContext} from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { findByLabelText } from '@testing-library/react';
import { SelectedFeatureContext } from './contexts/featuresContext'
const useStyles = makeStyles((theme) => ({

    featureContainer:{
        display:"flex",
        // justifyContent:"space-around",
        // width : "100%",
        // backgroundColor:"blue"
    },
    features:{
        background:"#FFF",
        width:85,
        height:65,
        // cursor:"pointer",

        marginRight:10,
        marginTop:10,
        "&:hover": {
            backgroundColor: "#ffebbaff"
        }
    },
  


  }));


function CreateFeatures({blockFk,addDisplay}) {
    const [selectedfeature , setSelectedfeature] = useContext(SelectedFeatureContext);


    
    const classes = useStyles();

    function handleSelectedFeature(e,feature){
        setSelectedfeature(feature) 
    }


    console.log(selectedfeature)
 
     return (
         <div className={classes.featureContainer}>
            <div >
                <Button id="text" className={classes.features+" features-hover"}  onClick={(e)=>{handleSelectedFeature(e,"text")}}>
                        text
                </Button>
                <Button id="image" className={classes.features+" features-hover"} onClick={(e)=>{handleSelectedFeature(e,"image")}}>
                    image 
                </Button> 
                {/* <Button id="typing" className={classes.features+" features-hover"} onClick={(e)=>{handleSelectedFeature(e,"video")}}>
                    typing

                </Button>   */}
                <Button  className={classes.features+" features-hover"} onClick={(e)=>{handleSelectedFeature(e,"video")}}>
                    video
                </Button>  
                <Button id="audio" className={classes.features+" features-hover"} onClick={(e)=>{handleSelectedFeature(e,"audio")}}>
                    Audio

                </Button>  

           
                <Button id="gallery" className={classes.features+" features-hover"} onClick={(e)=>{handleSelectedFeature(e,"gallery")}}>
                    gallery
                </Button>    
            </div>
        </div>

     )
}
export default CreateFeatures 