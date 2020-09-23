import React, { useState, useEffect } from 'react';
import {
  Form, FormGroup, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap"
import swal from "sweetalert"

const { REACT_APP_URL } = process.env

const numberRegex = new RegExp("^[0-9]*$")
const extRegex = new RegExp(/\.(jpg|png)$/i)

const ModalForm = (props) => {
  const { modalOpen, modalToggle, updateGoods, updating, creating } = props

  const [name, setName] = useState("")
  const [purchase, setPurchase] = useState("")
  const [selling, setSelling] = useState("")
  const [stock, setStock] = useState("")
  const [picture, setPicture] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)


  const [action, setAction] = useState("")
  const [ability, setAbility] = useState(false)

  const imageChange = (file) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setPicture(file)
      setImageUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const sendCreate = () => {

    if (
      name === "" ||
      purchase === "" ||
      selling === "" ||
      picture === null
    ) {
      return swal("Form invalid", "Form need to be filled", "error")
    }
    else if (!(numberRegex.test(purchase) && numberRegex.test(selling))) {
      return swal("Price invalid", "Price should be in number", "error")
    }
    else if (!(parseInt(purchase) > 1000 && parseInt(selling) > 1000)) {
      return swal("Price invalid", "It should be more than a thousand", "error")
    }
    else if (!extRegex.test(picture.name)) {
      return swal("Picture invalid", "Only for .jpg and .png filetype", "error")
    }
    else if (picture.size > (1024 * 100)) {
      return swal("Picture invalid", "Picture should be less than 100 kB", "error")
    }
    else {
      const data = {
        name, purchase, selling, picture
      }
      creating(data)
    }
  }

  const sendUpdate = (id) => {
    if (
      name === "" ||
      purchase === "" ||
      selling === "" ||
      picture === null
    ) {
      return swal("Form invalid", "Form need to be filled", "info")
    }
    else if (!(numberRegex.test(purchase) && numberRegex.test(selling))) {
      return swal("Form invalid", "Price should be in number", "error")
    }
    else if (!(parseInt(purchase) > 1000 && parseInt(selling) > 1000)) {
      return swal("Form invalid", "Price invalid, should be more than a thousand", "error")
    }
    else {
      const data = {
        id, name, purchase, selling, stock
      }
      if (imageUrl !== null) {
        if (!extRegex.test(picture.name)) {
          return swal("Picture invalid", "Only for .jpg and .png filetype", "error")
        }
        else if (picture.size > (1024 * 100)) {
          return swal("Picture invalid", "Picture should be less than 100 kB", "error")
        } else {
          Object.assign(data, picture)
        }
      }
      updating(data)
    }
  }




  useEffect(() => {
    if (Object.keys(updateGoods).length > 0) {
      setAction("update")
      setPicture(updateGoods.picture)
      setName(updateGoods.name)
      setPurchase(updateGoods.purchase_price)
      setSelling(updateGoods.selling_price)
      setStock(updateGoods.stock)
      setImageUrl(null)
    } else {
      setAction("create")
      setPicture(null)
      setStock("")
      setName("")
      setPurchase("")
      setSelling("")
      setStock("")

    }

  }, [updateGoods, action, setAbility])


  return (
    <Modal isOpen={modalOpen} toggle={modalToggle} backdrop={true} keyboard={true}>
      <ModalHeader toggle={modalToggle}>
        {action === "update" ? "Update Goods" : "Create Goods"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="input name"
              autoComplete="off"
              defaultValue={updateGoods.name || name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="purchase">Purchase Price</Label>
            <Input type="text" name="purchase" id="purchase" placeholder="input purchase price"
              autoComplete="off"
              defaultValue={updateGoods.purchase_price || purchase}
              onChange={e => setPurchase(e.target.value)}

            />
          </FormGroup>
          <FormGroup>
            <Label for="selling">Selling Price</Label>
            <Input type="text" name="selling" id="selling" placeholder="input selling price"
              autoComplete="off"
              defaultValue={updateGoods.selling_price || selling}
              onChange={e => setSelling(e.target.value)}
            />
          </FormGroup>
          {action === "update" &&
            <FormGroup>
              <Label for="stock">Stock Added</Label>
              <Input
                className="col-2" type="text" name="stock" id="stock" placeholder="..."
                autoComplete="off"
                defaultValue={Object.keys(updateGoods).length > 0 ? updateGoods['stock'].toString() : stock}
                onChange={e => setStock(e.target.value)}
              />
            </FormGroup>
          }
          <FormGroup>
            <Label for="picture">Picture</Label>
            {picture !== null ?
              <div>
                <img src={imageUrl !== null ? imageUrl : REACT_APP_URL + picture} alt="image" className="media-object" />
                <Button onClick={() => setPicture(null)} >delete</Button>
              </div> :
              <Input type="file" name="picture" id="picture"
                onChange={e => imageChange(e.target.files[0])}
              />}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="update"
          onClick={() => action === "create" ?
            sendCreate() : sendUpdate(updateGoods.id || null)
          }
          disabled={ability}
        >
          {action === "create" ? "Create Goods" : "Update Goods"}
        </Button>

        <Button className="delete" onClick={modalToggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}


export default ModalForm;
