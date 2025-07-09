import React from 'react';
import * as S from './style';
import LoadingGif from '../../assets/loading-gif.gif';

function Loading() {
  return (
    <S.Loading>
        <img src={LoadingGif} alt="loading-gif" />
    </S.Loading>
  )
}

export default Loading;