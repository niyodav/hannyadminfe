// import React from 'react'

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
const modalCss = {
    position :'fixed',
    top:"30%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    backgroundColor:"#b7b7b7    ",
    padding:"10px",
    zIndex:1000
}








function OptionsModel({open ,children, onClose}) {

    if (!open) return null 
    return (
        <div style={modalCss} >
            {children}  
        </div>
    )
}
export default OptionsModel



