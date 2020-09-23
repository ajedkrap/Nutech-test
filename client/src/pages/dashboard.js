import React, { useState, useEffect } from 'react';
import {
  Row, Col, Button, Input,
} from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArchive } from '@fortawesome/free-solid-svg-icons'

import styled, { keyframes } from 'styled-components';
import { headShake } from 'react-animations';

import { useSelector, useDispatch } from "react-redux"
import { clearMessage, getGoods, createGoods, updateGoods, deleteGoods } from "../redux/action/goods"

import DropDown from "./components/dropDown"
import Data from "./components/data"
import Paginate from "./components/pagination"
import ModalForm from "./components/modalForm"

import qs from "querystring"
import swal from "sweetalert"

const headShakeAnimate = keyframes`${headShake}`;

const HeadShakeDiv = styled.div`
  animation: 1s ${headShakeAnimate};
`;


const Dashboard = (props) => {
  const [params] = useState(qs.parse(props.location.search.slice(1)))
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false);
  const [goodsUpdate, setGoodsUpdate] = useState({})

  const dispatch = useDispatch()
  const goods = useSelector(state => state.goods)
  const { isLoading, isError, goodsData, pageInfo, message } = goods

  const modalToggle = (value = {}) => {
    setModal(!modal)
    if (Object.keys(value).length > 0) {
      setGoodsUpdate(value)
    } else {
      setGoodsUpdate({})
    }
  };

  const handleSearch = (e, params) => {
    if (e.keyCode === 13) {
      getAllGoods({ ...params, search })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }


  const getAllGoods = (params) => {
    dispatch(getGoods(params))
    if (params) {
      const param = qs.stringify(params)
      props.history.push(`?${param}`)
    }
  }

  const creatingGoods = (value) => {
    const {
      name,
      purchase,
      selling,
      picture
    } = value
    const formData = new FormData()
    formData.append('name', name)
    formData.append('purchase_price', purchase)
    formData.append('selling_price', selling)
    formData.append('picture', picture)
    dispatch(createGoods(formData))
    setModal(!modal)

  }

  const updatingGoods = (value) => {
    const formData = new FormData()
    for (let key in value) {
      switch (key) {
        case "name":
          formData.append('name', value[key])
          break
        case "purchase":
          formData.append('purchase_price', value[key])
          break
        case "selling":
          formData.append('selling_price', value[key])
          break
        case "stock":
          formData.append('stock', value[key])
          break
        case "picture":
          formData.append('picture', value[key])
          break
        default:
          break
      }
    }
    dispatch(updateGoods(formData, value.id))
    setModal(!modal)
  }

  const deletingGoods = (value) => {
    const { id, name } = value
    swal({
      title: `Are you sure you want to delete ${name}?`,
      text: "Once deleted, you will not be able to recover it!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteGoods(id))
        }
      })
  }


  useEffect(() => {
    document.title = "Dashboard"
    getAllGoods(params)

    if (message !== null) {
      if (isError) {
        swal({
          title: "Something is Wrong!",
          text: message,
          icon: "error",
        });
      }
      else {
        swal({
          title: "Success",
          text: message,
          icon: "success"
        })
      }
      dispatch(clearMessage())
    }

  }, [message, isError])

  params.page = params.page || 1
  params.sort = params.sort || 0
  params.search = search || ""


  return (
    <>
      <Row className="m-0 d-flex w-100 h-100 ">
        <div className="d-flex col-3 sidebar flex-column p-0">
          <div className="h3 top">
            <div className="brand">
              Nutech
            </div>
          </div>
          <div className="h3 command m-0">
            <HeadShakeDiv>
              <Button className="create" onClick={() => modalToggle()}>
                <FontAwesomeIcon className="create-icon" icon={faArchive} />
                <div className="create-title">Create Goods</div>
              </Button>
            </HeadShakeDiv>
          </div>
        </div>
        <div className="d-flex flex-column col-9 w-100 py-2 content my-0">
          <div className="col-2 p-0 m-0 content-header mw-100">
            <Col className="d-flex align-items-end justify-content-center list-title">List of Goods</Col>
            <Col className="d-flex flex-row align-items-end justify-content-around mw-100">
              <Input className="col-4 search" placeholder="Search"
                onChange={e => handleChange(e)}
                onKeyDown={e => handleSearch(e, params)}
              />
              <DropDown params={params} setSort={(params) => getAllGoods(params)} />
            </Col>
          </div>
          <div className="col p-0 m-0 py-2 my-2 content-table">
            <Data
              goodsData={goodsData}
              updateData={value => modalToggle(value)}
              deleteData={value => deletingGoods(value)}
            />
          </div>
          <div className="col-2 p-0 m-0 content-pagination">
            <Paginate params={params} pageInfo={pageInfo} setPage={(params) => getAllGoods(params)} />
          </div>
        </div>
        <ModalForm
          modalOpen={modal}
          modalToggle={() => modalToggle()}
          updateGoods={goodsUpdate}
          creating={(value) => creatingGoods(value)}
          updating={(value) => updatingGoods(value)}
        />
      </Row>
    </>
  );
}


export default Dashboard;
