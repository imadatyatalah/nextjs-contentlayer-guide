import { allPosts } from ".contentlayer/data";
import type { Post } from ".contentlayer/types";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.date}</div>

      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
}

export async function getStaticPaths() {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

// Statically fetch post by slug
export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post.slug === params?.slug);

  return { props: { post } };
}
