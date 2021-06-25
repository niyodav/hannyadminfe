import React from 'react'
import { useState } from "react";
import { Tabs,Tab } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 400,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));


function TabsDisplay({data,fields,addFk}) {

    const classes = useStyles();
    const [tabValue, setTabValue] = useState(data[0].node?data[0].node[fields.id]:"");

    const handleChange = (event, newValue) => {
        addFk(newValue)
        setTabValue(newValue);

    };

    return (
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
                data.map(block=>(
                        <Tab label={block.node[fields.name]} value={block.node[fields.id]}/>
                    ))
            }
            {/* {console.log(tabValue)} */}
        </Tabs>
        </div>
    )
 }
export default TabsDisplay




