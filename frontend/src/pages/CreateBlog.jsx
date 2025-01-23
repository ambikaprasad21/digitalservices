import PropTypes from "prop-types";
import styles from "./CreateBlog.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utility/constant";
import Editor from "../components/Editor";

async function createBlog({ title, desc, image }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("desc", desc);
  formData.append("image", image);

  try {
    const response = await axios.post(`${API_URL}/blog/create`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create the blog."
    );
  }
}

async function updateBlog(id, { title, desc }) {
  const formData = {
    title,
    desc,
  };
  try {
    const response = await axios.patch(`${API_URL}/blog/${id}`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update the blog."
    );
  }
}

async function fetchBlogById(id) {
  try {
    const response = await axios.get(`${API_URL}/blog/${id}`);
    return response.data.data.blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch the blog."
    );
  }
}

function CreateBlog({ type }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlog() {
      if (type === 1 && id) {
        try {
          const blog = await fetchBlogById(id);
          setTitle(blog.title);
          setDesc(blog.desc);
        } catch (error) {
          toast.error(error.message);
        }
      }
    }

    getBlog();
  }, [type, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === 0) {
        await createBlog({ title, desc, image });
        toast.success("Blog created successfully!");
      } else if (type === 1 && id) {
        await updateBlog(id, { title, desc });
        toast.success("Blog updated successfully!");
      }

      setTitle("");
      setDesc("");
      setImage(null);
      navigate("/blogs");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.blog}>
      <h1>{type === 0 ? "New Blog" : "Edit Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.f_d}>
          <label htmlFor="title">
            Blog title <span className={styles.star}>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {type === 0 && (
          <div className={styles.f_d}>
            <label htmlFor="image">
              Blog thumbnail <span className={styles.star}>*</span>
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
        )}

        <div className={styles.f_d}>
          <label htmlFor="desc">
            Blog content <span className={styles.star}>*</span>
          </label>
          <Editor
            text={desc}
            setText={setDesc}
            textareaplaceholder={"Write blog content here..."}
          />
          {/* <textarea
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            rows={10}
          /> */}
        </div>
        <button className={styles.btn} disabled={loading}>
          {loading
            ? "Processing..."
            : type === 0
            ? "Create blog"
            : "Update blog"}
        </button>
      </form>
    </div>
  );
}

CreateBlog.propTypes = {
  type: PropTypes.number.isRequired,
};

export default CreateBlog;
