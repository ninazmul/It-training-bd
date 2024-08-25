import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `get-all-orders`,
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
          name: payment_info.name,
          email: payment_info.email,
          phone: payment_info.phone,
          transactionId: payment_info.transactionId,
        },
        credentials: "include",
      }),
    }),
    getOrdersWithMinimalInfo: builder.query({
      query: () => ({
        url: `minimal-info`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateOrderPaymentStatus: builder.mutation({
      query: ({ orderId, isPaid }) => ({
        url: `update-payment-status`,
        method: "PUT",
        body: { orderId, isPaid },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetOrdersWithMinimalInfoQuery,
  useUpdateOrderPaymentStatusMutation,
} = courseApi;
