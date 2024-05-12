import axios from 'axios'
import Swal from 'sweetalert2'

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {

    dispatch({ type: 'PLACE_ORDER_REQUEST' })

    const currentUser = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        type: localStorage.getItem('type'),
        _id: localStorage.getItem('userId')
    }
    const cartItems = getState().cartReducer.cartItems
    console.log('currentuser:',currentUser)

    try {

        await axios.post('/api/enroll', { token: token, subtotal, currentUser, cartItems })
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        setTimeout(function(){
            window.location.replace('/orders');
         }, 1000);

    } catch (error) {

        dispatch({ type: 'PLACE_ORDER_FAILED' })
        console.log(error);
    }
}


export const getUserOrders = () => async (dispatch , getState) => {

    const _id =  localStorage.getItem('userId')
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' })
    console.log("inside getUserOrders")

    try {

        const response = await axios.post('/api/getusercourses' , {userid : _id})
        console.log(response);
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload : response.data })
        

    } catch (error) {
        console.log("failed")

        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload : error })
    }

}

export const deleteOrderAction = (OrderID) => async dispatch => {

    dispatch({ type: 'ORDER_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`https://hungrymeals-backend.onrender.com/api/orders/delete/Order/${OrderID}`)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Order deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/Orders');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_ORDER_SUCCESS' })




    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Unsuccessful Operation'
        })


        dispatch({ type: 'DELETE_OPERATION_FAILED', payload: error })
    }
}
export const updateOrderDeliveryAction = (updateisDeliverd, orderId) => async dispatch => {

    dispatch({ type: 'UPDATE_ORDER_DELIVERY_VERIFICATION_REQUEST' })


        try {
            const response = await axios.put(`https://hungrymeals-backend.onrender.com/api/orders/update/order/status/${orderId}`, updateisDeliverd)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Order approved successfully!'
            })
            setTimeout(function () {
                window.location.reload('/admin/orders');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_ORDER_DELIVERY_VERIFICATION_SUCCESS' })


        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Order approved unsuccessfully'
            })

            dispatch({ type: 'UPDATE_ORDER_DELIVERY_VERIFICATION_FAILED', payload: error })
        }


    


}

export const updaterefundrequestAction = (updatesendrefundStatus, orderId) => async dispatch => {

    dispatch({ type: 'UPDATE_REFUND_REQUEST' })


        try {
            const response = await axios.put(`https://hungrymeals-backend.onrender.com/api/orders/update/order/refund/request/${orderId}`, updatesendrefundStatus)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Refund request send successfully!'
            })
            setTimeout(function () {
                window.location.reload('/admin/orders');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_REFUND_REQUEST_SUCCESS' })


        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Refund request send unsuccessfully'
            })

            dispatch({ type: 'UPDATE_REFUND_REQUEST_FAILED', payload: error })
        }


}

export const updateuserrefundrequestAction = (updateorderStatus, orderId) => async dispatch => {

    dispatch({ type: 'UPDATE_REFUND_REQUEST' })


        try {
            const response = await axios.put(`api/update/refund/request/user/${orderId}`, updateorderStatus)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Refund request send successfully!'
            })
            setTimeout(function () {
                window.location.reload('/admin/orders');
            }, 1500);
           

            console.log(response);
            dispatch({ type: 'UPDATE_REFUND_REQUEST_SUCCESS' })


        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Refund request send unsuccessfully'
            })

            dispatch({ type: 'UPDATE_REFUND_REQUEST_FAILED', payload: error })
        }


}