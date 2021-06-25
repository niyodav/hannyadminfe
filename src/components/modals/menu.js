import React from "react";
import { useEffect, useCallback, useState, useContext } from "react";
import { SelectedMenuContext } from '../contexts/selectedMenuContext';

import useContextMenu from "./useContextMenu";

const Menu = ({ outerRef,contextKey }) => {
  const [id, setId] = useState(false);

  const { xPos, yPos, menu, row } = useContextMenu(outerRef);
  const [selectedMenu , setSelectedMenu] = useContext(SelectedMenuContext);

  // console.log(row)
  // console.log(xPos)
  // console.log(yPos)
  function handleClick(e,id){
    setSelectedMenu({...selectedMenu,[contextKey]:{id:row,action:e.target.innerHTML}})
    // console.log(row,"checkimoiiing ")
    // console.log(e.target.innerHTML,"dkjekgfkjgk ")

  }

  if (menu) {
    return (
      <ul className="menu" id ={row} style={{ top: yPos, left: xPos }}>
        <li onClick={(e)=>{handleClick(e,row)}} value="edit">edit</li>
        <li onClick={(e)=>{handleClick(e,row)}} value="delete">delete</li>
        <li onClick={(e)=>{handleClick(e,row)}} value="copy">copy</li>
      </ul>
    );
  }
  return <></>;
};

export default Menu;
