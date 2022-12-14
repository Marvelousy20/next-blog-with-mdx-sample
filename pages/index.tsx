import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import { getBlogPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/Date";
import Image from "next/image";

interface PostsData {
  title: string;
  slug: string;
  description: string;
  date: string;
}

interface Props {
  posts: PostsData[];
}

export default function Home({ posts }: Props) {
  console.log(posts);

  return (
    <div className={styles.container}>
      <Head>
        <title>My sample next blog</title>
        <meta name="description" content="Blog created with mdx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-[800px] mx-auto">
        <h1 className="text-center mb-6 text-3xl pt-4">
          Welcome to Marvelous&apos;s Blog
        </h1>

        {posts.map(({ title, description, slug, date }) => (
          <div key={slug} className="border mb-2 p-4">
            <Link href={`posts/${slug}`}>
              <h2 className="text-2xl">{title}</h2>
              <h4 className="text-lg">{description}</h4>
              <small>
                {/* <Date dateString={date} /> */} {date}
              </small>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogPostsData();

  return {
    props: {
      posts,
    },
  };
};
