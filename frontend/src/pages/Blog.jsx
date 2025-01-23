import { useQuery } from "@tanstack/react-query";
import styles from "./Blog.module.css";
import { getBlogById } from "../api/blog";
import { useParams } from "react-router-dom";

function Blog() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.blog}>
      <h1>{data.title}</h1>
      <img src={data.img} alt="blog image" />

      <article dangerouslySetInnerHTML={{ __html: data.desc }}></article>
    </div>
  );
}

export default Blog;
