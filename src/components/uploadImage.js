import React from 'react'



function UploadImage(addFileData) {
 
    function handleFiles(e){
        if (e.target.files[0]){
            addFileData({
            content: e.target.files[0]})
        }
        else {
            alert("No files ")
        }


    }


  
    return (
        <div>
            
            <input type="file" id="upload" hidden style={{display:"none",cursor:"pointer"}}  onChange={handleFiles}/>
            <label for="upload" style={{cursor:"pointer"}}><div>Upload image</div></label>
            
                    
        </div>
    )
}

export default UploadImage