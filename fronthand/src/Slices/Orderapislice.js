import { apiSlice } from "./apislice";



export const OrderSlice=apiSlice.injectEndpoints({

    endpoints:(builder)=>({
        CreateOrder:builder.mutation({
            query:(data)=>({
                url:'/api/orders',
                method:'POST',
                credentials:'include',
                body:data
            })
        }),
        Getorderbyid:builder.query({
            query:(id)=>({
                url:`api/orders/${id}`,
                method:'GET',
                credentials:'include'
            }),
            keepUnusedDataFor:5
        }),
        Updatepayment:builder.mutation({
            query:({id,details})=>({
                url:`/api/orders/${id}/pay`,
                method:'PUT',
                credentials:'include',
                body:{...details}
            })
        }),
        Paymentdetails:builder.query({
            query:()=>({
                url:'/api/config/paypal'
            }),
            keepUnusedDataFor:5
        }),
        Mineorders:builder.query({
            query:()=>({
                url:'/api/orders/mine',
                credentials:'include'
            }),
            keepUnusedDataFor:5
        }),

        getAllorders:builder.query({
            query:()=>({
                url:'api/orders/',
                credentials:'include'
            })
        }),
        Deliveredstatusupdate:builder.mutation({
            query:(id)=>({
                url:`/api/orders/${id}/deliver`,
                method:'PUT',
                credentials:'include'

            })
        })

    })

})

export const {
  useGetAllordersQuery,
  useMineordersQuery,
  useCreateOrderMutation,
  useGetorderbyidQuery,
  useUpdatepaymentMutation,
  usePaymentdetailsQuery,
  useDeliveredstatusupdateMutation
} = OrderSlice;