import React from 'react';
import { useDispatch } from 'react-redux';
import { getItem , deleteItemAction} from '../../store';

const Item = ({item}) => {
    const {name,quantity,price,discount,total,pId }= item;
    const dispatch = useDispatch();

    return (
        <tr>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>{price}</td>
        <td>{discount}</td>
        <td>{total}</td>
        <td className= "d-flex flex-row ">
                <button className="btn btn-primary material-icons mr-2" 
                onClick={ () => {
                     dispatch(getItem(pId));
                }
                }>edit</button>
                <button className="btn btn-primary material-icons"
                 onClick = {() => dispatch(deleteItemAction(pId))}
                >delete</button>
        </td>
      </tr> 
    )
}

export default Item
