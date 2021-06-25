import { useState } from "react";



export default function SetClicked({fk}){
    const [clickedTab,setClickedTab] = useState("")
        setClickedTab(fk);
        }

