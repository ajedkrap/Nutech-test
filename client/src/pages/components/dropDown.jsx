import React, { useState } from 'react';
import {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortAlphaDown, faSortAlphaDownAlt } from '@fortawesome/free-solid-svg-icons'

const DropDown = (props) => {
  const { params, setSort } = props

  const [sortOpen, setSortOpen] = useState(false);


  return (
    <>
      <ButtonDropdown isOpen={sortOpen} toggle={() => setSortOpen(!sortOpen)} className="col-3 ">
        <DropdownToggle id="sort" className="p-2 toggle" caret>
          Sort
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Choose Sort Options</DropdownItem>
          <DropdownItem className="d-flex flex-row align-items-center" onClick={() => setSort({ ...params, sort: 0 })}>
            <FontAwesomeIcon className="mx-2" icon={faSortAlphaDown} />
            <div>Ascending</div>
          </DropdownItem>
          <DropdownItem className="d-flex flex-row align-items-center" onClick={() => setSort({ ...params, sort: 1 })}>
            <FontAwesomeIcon className="mx-2" icon={faSortAlphaDownAlt} />
            <div>Descending</div>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    </>
  );
}


export default DropDown;
