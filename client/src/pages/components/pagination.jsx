import React from 'react';
import {
  Pagination, PaginationItem, PaginationLink,
} from "reactstrap"

const PaginationBar = (props) => {
  const { pageInfo, params, setPage } = props
  const { totalPage, prevLink, nextLink } = pageInfo

  return (
    <Pagination aria-label="Page navigation example">
      {prevLink !== null ?
        <PaginationItem className="mx-3" onClick={() => setPage({ ...params, page: parseInt(params.page) - 1 })}>
          <PaginationLink>
            Prev
              </PaginationLink>
        </PaginationItem> :
        <PaginationItem className="mx-3">...</PaginationItem>
      }
      {[...Array(totalPage)].map((o, i) => {
        return (
          <PaginationItem onClick={() => setPage({ ...params, page: params.page ? i + 1 : i + 1 })}
            className='mx-3' key={i.toString()}>
            <PaginationLink>{i + 1}</PaginationLink>

          </PaginationItem>
        )
      })}
      {nextLink ?
        <PaginationItem className="mx-3" onClick={() => setPage({ ...params, page: parseInt(params.page) + 1 })}>
          <PaginationLink>
            Next
            </PaginationLink>
        </PaginationItem> :
        <PaginationItem className="mx-3">...</PaginationItem>
      }
    </Pagination>
  );
}


export default PaginationBar;
