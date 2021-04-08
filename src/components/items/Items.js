import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Item from './Item';
import { addItemAction, updateItemAction } from "../../store";
import shortid from 'shortid';

function Items() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.items); //to access redux store's state
  const updatedState = useSelector(state => state.item);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [total, setTotal] = useState(0);


  useEffect(() => {
    if (updatedState != null) {
      setName(updatedState.name);
      setPrice(updatedState.price);
      setQuantity(updatedState.quantity);
      setDiscount(updatedState.discount);
      setTotal(updatedState.total);
    }
  }, [updatedState]);




  const addItem = (e) => {

    const new_item = {
      pId: shortid.generate(),
      name: name,
      quantity: quantity,
      price: price,
      discount: discount,
      total: total
    }
    console.log("addItem", new_item)
    if (total > 0)
      dispatch(addItemAction(new_item));

    reset();

  }

  const reset = () => {
    setQuantity('');
    setPrice('');
    setDiscount('');
    setName('');
    setTotal(0);
  }

  const onUpdateItem = (e) => {
    const update_item = Object.assign(updatedState, {
      name: name,
      quantity: quantity,
      price: price,
      discount: discount,
      total: total
    })
    dispatch(updateItemAction(update_item));
    reset();
  }

  return (
    <div>
      <table className="table shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Enter Item Name"
                value={name}
                onChange={e => setName(e.target.value)} /></td>
            <td>
              <input
                type="text"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={e => {

                  setQuantity(e.target.value)
                  if (!isNaN(e.target.value) && !isNaN(price) && !isNaN(discount)) {
                    setTotal((price - ((discount / 100) * price)) * e.target.value);
                  }


                }}
              /></td>
            <td>
              <input
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={e => {
                  setPrice(e.target.value)
                  if (!isNaN(quantity) && !isNaN(e.target.value) && !isNaN(discount)) {
                    setTotal((e.target.value - ((discount / 100) * e.target.value)) * quantity);
                  }
                }
                }
              /></td>
            <td>
              <input
                type="text"
                placeholder="Enter Discount"
                value={discount}
                onChange={e => {
                  setDiscount(e.target.value)
                  if (!isNaN(quantity) && !isNaN(price) && !isNaN(e.target.value)) {
                    setTotal((price - ((e.target.value / 100) * price)) * quantity);
                  }
                }}

              />
            </td>
            <td>
              <input
                type="text"
                readOnly value={total}
              /></td>
            <td>
              {updatedState !== null ? (<button className="btn btn-primary"
                onClick={(e) => onUpdateItem(e)}>Save</button>) : (<button className="btn btn-primary"
                  onClick={(e) => addItem(e)}>Add</button>
              )
              }
            </td>
          </tr>
        </thead>
        <tbody>

          {state.map(item => <Item item={item} key={item.pId} />)}

        </tbody>
      </table>
    </div>
  )
}

export default Items;
