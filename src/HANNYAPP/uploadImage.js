import React from 'react'
import { useState ,useEffect,useContext} from "react";
import uuid from "uuid";



function UploadImage({label}) {



    const [file,setFile] = useState(false);


    
    function handleFiles(e){
        if (e.target.files[0]){
            setFile(e.target.files[0])
        }
        else {
            alert("No files ")
        }


    }



  
    return (
        <div style={{background: 'yellow' ,justifyContent: 'center', alignItems:'center' ,}}>
                    
                <div>
                    <input type="file" id="upload" hidden style={{display:"none",cursor:"pointer"}}  onChange={handleFiles}/>
                    <label for="upload" style={{cursor:"pointer"}}><div>{label}</div></label>
                    
                </div>  
                
        </div>
    )
}

export default UploadImage