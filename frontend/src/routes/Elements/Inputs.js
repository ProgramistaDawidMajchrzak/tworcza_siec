import React from 'react';
import '../../index.css'
import '../../App.css'


export function Button({style, type, value, onClick, className}) {
  return (
    <input
      onClick={onClick}
      type={type ? type : "button"} 
      value={value}
      className={className ? className :'primary-button'}
      style={style}
    />
  )
}

