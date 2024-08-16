import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: `create-order`,
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include",
      }),
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: "payment",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreatePaymentMutation,
  useCreateOrderMutation,
} = courseApi;
