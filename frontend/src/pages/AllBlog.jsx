import { Link, NavLink } from "react-router-dom";
import styles from "./AllBlog.module.css";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, getAllBlog } from "../api/blog";
import { useLogin } from "../context/LoginContext";
import toast from "react-hot-toast";
import { SpinnerCircular } from "spinners-react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

function AllBlog() {
  const { user } = useLogin();

  const { data: blogData, isLoading } = useQuery({
    queryKey: "allblogs",
    queryFn: getAllBlog,
  });

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: handleDeleteBlog } = useMutation({
    mutationKey: "allblogs",
    mutationFn: deleteBlog,
    onSuccess: () => {
      toast.success("Blog deleted succussfully");
      queryClient.invalidateQueries(["allblogs"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      handleDeleteBlog(id);
    }
  };

  if (isLoading)
    return (
      <SpinnerCircular
        enabled={true}
        color="#e89509"
        style={{
          margin: "10rem auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  return (
    <div className={styles.blog}>
      {user && (
        <button>
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={"/create/blog"}
          >
            +Create blog
          </NavLink>
        </button>
      )}

      <div className={styles.grid}>
        {blogData.map((blog) => {
          return (
            <NavLink
              to={`/blog/${blog._id}`}
              key={blog._id}
              className={styles.bl_ca}
            >
              <img src={blog.img} alt="thumbnail of blog" width={"80rem"} />
              <div className={styles.bl_cont}>
                <div className={styles.top}>
                  <div className={styles.title_action}>
                    <h1>{blog.title}</h1>
                    {user && (
                      <div className={styles.icons}>
                        <Link to={`/edit/blog/${blog._id}`}>
                          <FaPencilAlt
                            style={{
                              color: "blue",
                              fontSize: "1.2rem",
                              cursor: "pointer",
                            }}
                          />
                        </Link>

                        <FaTrashAlt
                          style={{
                            color: "red",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(blog._id);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <p
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.desc.length < 80
                          ? blog.desc
                          : blog.desc.substring(0, 80) + "...",
                    }}
                  ></p>
                </div>

                <div className={styles.date_author}>
                  <time>{formatDate(blog.createdAt)}</time>
                  <p>
                    Author: <span>Admin</span>
                  </p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default AllBlog;
