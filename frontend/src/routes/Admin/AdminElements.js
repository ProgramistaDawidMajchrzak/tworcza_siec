import React from 'react';
import * as S from './style';

export function AdminTable({children}) {
  return (
    <S.AdminTable>
        <table border="1">
            {children}
        </table>
    </S.AdminTable>
  )
}
export function TableSearchBox({children}) {
  return (
    <S.TableSearchBox>
      {children}
    </S.TableSearchBox>
  )
}