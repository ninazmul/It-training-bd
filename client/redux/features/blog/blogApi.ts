import { apiSlice } from "../api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query to fetch all blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: "all-blogs",
        method: "GET",
        credentials: "include",
      }),
    }),

    // Query to fetch a single blog by ID
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `blog/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Mutation to upload a new blog (admin only)
    uploadBlog: builder.mutation({
      query: (blogData) => ({
        url: "upload-blog",
        method: "POST",
        body: blogData,
        credentials: "include",
      }),
    }),

    // Mutation to delete a blog by ID (admin only)
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `blog/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

// Exporting hooks for using these endpoints
export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useUploadBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
