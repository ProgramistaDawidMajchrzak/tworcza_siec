import React from 'react';
import * as S from "./style"

export function TwoColumns({children}) {
  return (
    <S.TwoColumns>{children}</S.TwoColumns>
  )
}

export function Column({children}) {
    return (
      <S.Column>{children}</S.Column>
    )
}

export function Spacer() {
    return (
      <S.Spacer/>
    )
  }
export function BlueContainer({style, children}) {
    return (
      <S.BlueContainer style={style}>
        {children}
      </S.BlueContainer>
    )
  }

  export function TwoTitles({style, title, subtitle}) {
    return (
      <S.TwoTitles style={style}>
          <h4>{title}</h4>
          <h2>{subtitle}</h2>
      </S.TwoTitles>
    )
  }
  export function Title({style, title}) {
    return (
      <S.Title style={style}>
          {title}
      </S.Title>
    )
  }
  
  
