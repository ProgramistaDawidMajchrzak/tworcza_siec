import React from 'react';
import { Button } from './Inputs';
import * as S from './style';

export function Form({children, handleSubmit, sendText}) {
  return (
    <form 
        className='form-container' 
        onSubmit={handleSubmit}
        >
            {children}
            <Button 
                type='submit' 
                value={sendText}
                style={{marginTop: '1rem'}}
            />
    </form>
  )
}


export function FormInput({ value, style, label, onChange, type, placeholder, error , name}) {
    return (
        <S.FormInput>
            <label>{label}</label>
            <input
                name={name}
                // type={type}
                // style={{ ...style, border: `${error ? '2px solid #f96363' : 'none'}` }}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
            />
        </S.FormInput>
    )
}

export function FormArea({ value, rows, style, label, onChange, placeholder, error , name}) {
    return (
        <S.FormInput>
            <label>{label}</label>
            <textarea
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </S.FormInput>
    )
}