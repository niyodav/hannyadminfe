import React, { useRef } from "react";

import Menu from "./menu";

const Table = () => {
  const outerRef = useRef(null);

  return (
    <div className="table-container">
      <Menu outerRef={outerRef} />
      <table ref={outerRef}>
        <thead>
          <th>
            <input type="checkbox" />
          </th>
          <th>Name</th>
          <th>Age</th>
        </thead>
        <tbody ref={outerRef}>
          <tr id="row1">
            <td>
              <input type="checkbox" />
            </td>
            <td>Smbc</td>
            <td>20</td>
          </tr>
          <tr id="row2">
            <td>
              <input type="checkbox" />
            </td>
            <td>Xkcd</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
