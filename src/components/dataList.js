import React from 'react'
import { useState } from "react";
import { Button,List, IconButton, ListItem, Typography } from "@material-ui/core";
import ScenerioGroups from './createChallenge';

function DataList({data, className,fields,addFk}) {
    const [extraClass , setExtraClass] = useState('active')
    const [fk, setFk] = useState('')
    function handleClicks(e){
        e.preventDefault();
        setFk(e.target.id)
        setExtraClass('active')
        addFk(e.target.id)
        setFk('');
   

    }
    return (
        
        <div>
        {
        data.map(block=>(
            <List key={block.node[fields.id]}>
                <ListItem style={{ display: "flex" }} >
                    <Button   className={className + " "+extraClass} id={block.node[fields.id]} onClick={handleClicks}>               
                         {block.node[fields.name]}
                    </Button>
                </ListItem>
            </List>
            ))

             
            }
            
            
        </div>
    )
}
export default DataList




