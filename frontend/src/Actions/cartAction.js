export const addToCarts = (value) => (dispatch, getState) => {



    var cartItem = {
        itemName: value.itemName,
        desc: value.desc,
        _id: value._id,
        price: value.price,
        date: value.date,
        photo: value.photo,
        postedBy: value.postedBy,
      }
 
    dispatch({ type: 'ADD_TO_CART', payload: cartItem })

    console.log("cartaction:",cartItem);
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    console.log("cart items:", cartItems);
    }
export const deleteFromCart = (value) => (dispatch, getState) => {


    dispatch({ type: 'DELETE_FROM_CART', payload: value })

    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    console.log("cart items:", cartItems);

}