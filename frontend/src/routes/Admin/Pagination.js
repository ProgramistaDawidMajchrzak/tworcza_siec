import React from 'react';
import * as S from './style';
import ReactPaginate from 'react-paginate';


function Pagination({totalPages, handlePageClick, page}) {
  return (
    <S.PaginationContainer>
        <ReactPaginate
            forcePage={page}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    </S.PaginationContainer>
  )
}

export default Pagination;