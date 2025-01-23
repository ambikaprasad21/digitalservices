import axios from "axios";
import { API_URL } from "../utility/constant";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function getAllBlog() {
  try {
    const allBLogs = await axiosInstance.get("/blog");
    const data = allBLogs.data.data.blogs;
    return data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function getBlogById(id) {
  try {
    const blog = await axiosInstance.get(`/blog/${id}`);
    const data = blog.data.data.blog;
    return data;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function deleteBlog(id) {
  try {
    await axiosInstance.delete(`/blog/${id}`);
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}
