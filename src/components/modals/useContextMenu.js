// import React from 'react'
// import {useState,useEffect,useCallback} from 'react'
// import {Motion, spring} from 'react-motion';


// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     menu:{
//         cursor:"pointer",
//         padding :10,
       
//         "&:hover": {
//             backgroundColor: "#ffebbaff"
//         }
//     },
//     menuContainer:{
//         height :100,
//         width:100,
//         backgroundColor:"grey"

//     }
  


//   }));


// // function ContextMenu() {
// //     const [show , setShow] =useState(true)


// //     const cm = document.querySelector(".custom-cm");

// // function showContextMenu(show) {
// //     setShow(show)
// // }

// // window.addEventListener("contextmenu", e => {
// //   e.preventDefault();

// //   showContextMenu(true);

// //   const xPos = e.pageX + "px";
// //   const yPos = e.pageY + "px";
// // //   cm.style.top =
// // //     e.y + cm.offsetHeight > window.innerHeight
// // //       ? window.innerHeight - cm.offsetHeight
// // //       : e.y;
// // //   cm.style.left =
// // //     e.x + cm.offsetWidth > window.innerWidth
// // //       ? window.innerWidth - cm.offsetWidth
// // //       : e.x;
// // });

// // window.addEventListener("click", () => {
// //   showContextMenu(false);
// // });

// //     return (
// //         <div>

// //         <div className="custom-cm" style={{display:show ? "block" : "none"}}>
// //         <div className="custom-cm__item">Item #1</div>
// //         <div className="custom-cm__item">Item #2</div>
// //         <div className="custom-cm__item">Item #3</div>
// //         <div className="custom-cm__divider"></div>
// //         <div className="custom-cm__item">Item #4</div>
// //         </div>
            
// //         </div>
// //     )
// // }


// // export default ContextMenu



// const useContextMenu = () => {
//     const [xPos, setXPos] = useState("0px");
//     const [yPos, setYPos] = useState("0px");
//     const [showMenu, setShowMenu] = useState(false);
  
//     const handleContextMenu = useCallback(
//       (e) => {
//         e.preventDefault();
  
//         setXPos(`${e.pageX}px`);
//         setYPos(`${e.pageY}px`);
//         setShowMenu(true);
//       },
//       [setXPos, setYPos]
//     );
  
//     const handleClick = useCallback(() => {
//       showMenu && setShowMenu(false);
//     }, [showMenu]);
  
//     useEffect(() => {
//       document.addEventListener("click", handleClick);
//       document.addEventListener("contextmenu", handleContextMenu);
//       return () => {
//         document.addEventListener("click", handleClick);
//         document.removeEventListener("contextmenu", handleContextMenu);
//       };
//     });
  
//     return { xPos, yPos, showMenu };
//   };


//   const ContextMenu = ({ menu }) => {
//     const classes = useStyles();

//     const { xPos, yPos, showMenu } = useContextMenu();
//     return (
//       <Motion
//         defaultStyle={{ opacity: 0 }}
//         style={{ opacity: !showMenu ? spring(0) : spring(1) }}
//       >
//         {(interpolatedStyle) => (
//           <>
//             {showMenu ? (
//               <div
//                 className="menu-container"
//                 style={{
//                   top: yPos,
//                   left: xPos,
//                   opacity: interpolatedStyle.opacity,
                  
//                 }}
//               >
//                   <div className={classes.menuContainer}>
//                     <div className={classes.menu}>edit</div>
//                     <div className={classes.menu} >delete</div>
//                     {/* <div className={classes.menu}>copy</div> */}
//                   </div>

//                 {/* {menu} */}
//               </div>
//             ) : (
//               <></>
//             )}
//           </>
//         )}
//       </Motion>
//     );
//   };
//   export default ContextMenu


  
import { useEffect, useCallback, useState } from "react";

const useContextMenu = outerRef => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [menu, showMenu] = useState(false);
  const [row, setRow] = useState(null);
  const [div , setDiv] = useState(null);
  const [button , setButton] = useState(null);


  const handleContextMenu = useCallback(
    event => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        // Do comment if you find any alternative for below line
        const target = event.target.closest("tr,button,.context-menu");
        // const divtarget = event.target.closest("div");
        // const buttontarget = event.target.closest("button");


        if (target) {
          showMenu(true);
          setRow(target.id);
          // console.log(target)
        }
        // else if (divtarget) {
        //   showMenu(true);
        //   setDiv(target.id);
        // }
        // else if (buttontarget) {
        //   showMenu(true);
        //   setButton(target.id);
        // }
      } else {
        setRow(false);
        // setDiv(false)
        // setButton(false)

        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    // console.log(row,"wdkhkhffhk")
    showMenu(false);
    
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPos, yPos, menu, row };
};

export default useContextMenu;
