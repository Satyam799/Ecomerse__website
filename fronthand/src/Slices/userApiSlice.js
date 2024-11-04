import { apiSlice } from "./apislice";

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:'/api/user/login',
                method:'POST',
                credentials:'include',
                body:data
            }),

        }),
        Register:builder.mutation({
            query:(data)=>({
                url:'/api/user/',
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:(data)=>({
                url:'/api/user/logout',
                method:'POST',

            })
        }),
        Profile:builder.mutation({
            query:(data)=>({
                url:'/api/user/profile',
                method:'PUT',
                credentials:'include',
                body:data
            })
        }),
        Allusers:builder.query({
            query:()=>({
                url:'/api/user/',
                credentials:'include'

            })
        }),
        Deleteuser:builder.mutation({
            query:(id)=>({
                url:`/api/user/${id}`,
                method:'DELETE',
                credentials:'include'
                
            })
        }),
        Getindividualuser:builder.query({
            query:(id)=>({
                url:`/api/user/${id}`,
                credentials:'include'
            }),
            keepUnusedDataFor:5
        }),
        Updateuserdetail:builder.mutation({
            query:(data)=>({
                url:`/api/user/${data.id}`,
                method:'PUT',
                credentials:'include',
                body:data
            }),
            invalidatesTags:['Users']

        })

    })
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useAllusersQuery,
  useDeleteuserMutation,
  useGetindividualuserQuery,
  useUpdateuserdetailMutation
} = userApiSlice;