import React from "react";

export default function LiRepository (props) {

  const { title, id, onClick } = props;

  return (
    
    <li>
      {title}
        <button
          value={id}
          onClick={onClick}>
          Remover
        </button>
    </li>
    
  )
    
}


  