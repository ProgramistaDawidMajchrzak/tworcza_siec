import React from 'react';
import * as S from './style';
import { TwoTitles } from './TwoColumns';

function Banner({title, subtitle, icon}) {
  return (
    <S.Banner>
        <TwoTitles 
          style={{marginLeft: "30px"}}
          title={title}
          subtitle={subtitle}
        />
    </S.Banner>
  )
}

export default Banner