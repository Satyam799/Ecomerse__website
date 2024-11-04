import { createSlice } from "@reduxjs/toolkit"

function Roundoff(Num){
 return (
    Math.round((Num*100)/100).toFixed(2)
 )
}



const initialState= localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :    {cartItem:[],
  shippingAddress:{},
  paymetMethod:'PayPal',
  itemprice:'',
  shippingprice:'',
  taxprice:'',
  totalproice:''
}




const cartSlice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        addtocart(state,action){
            
           // const item=state.cartItem.find((el)=>el._id === action.payload)
            
            const existing=state.cartItem.find((el)=>el._id === action.payload._id)
     
            if(existing){
                state.cartItem=state.cartItem.map((el)=>el._id===existing._id ? action.payload :el)
            }else{
                state.cartItem=[...state.cartItem,action.payload]
            }

            state.itemprice= Roundoff(Number(state.cartItem.reduce((acc,crr)=>acc+crr.price*crr.qty,0)))
            state.shippingprice=Roundoff(Number(state.itemprice > 100 ? 10 :0))
            state.taxprice=Roundoff(Number(state.itemprice *0.15))
            state.totalproice=Roundoff(Number(state.itemprice)+Number(state.shippingprice)+Number(state.taxprice))

            localStorage.setItem('cart' , JSON.stringify(state))
        },

        shippingdetails(state,action){

          state.shippingAddress=action.payload
          localStorage.setItem('cart' , JSON.stringify(state))

        },
        Remocecart(state,action){
            state.cartItem=state.cartItem.filter((el)=>el._id !==action.payload._id)
        },
        SavePaymentmethod(state,action){
            state.paymentMethod=action.payload
            localStorage.setItem('cart',JSON.stringify(state))
        },
        ClearCart(state,action){
            state.cartItem=[]
            localStorage.setItem('cart',JSON.stringify(state))

        }
}
})


export const {addtocart,Remocecart,shippingdetails,SavePaymentmethod,ClearCart}=cartSlice.actions
export default cartSlice.reducer
