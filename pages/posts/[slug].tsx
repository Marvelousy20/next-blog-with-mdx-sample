import { GetStaticPaths, GetStaticProps } from "next";
import { getBlogContentById, getBlogsId } from "../../lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import Text from "../../components/Text";

interface FrontMatter {
  title: string;
  date: string;
  description: string;
}

interface Post {
  slug: string;
  code: string;
  frontmatter: FrontMatter;
}

const components = { Text };

export default function Post({ slug, code, frontmatter }: Post) {
  const { title, description, date } = frontmatter;

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center py-5">
        <h1 className="text-4xl text-green-500">{title}</h1>
        <p className="text-2xl">{description}</p>
        <small>{date}</small>
      </div>

      <section>
        <Component components={components} />
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getBlogsId();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogPostData = await getBlogContentById(params?.slug as string);
  return {
    props: {
      ...blogPostData,
    },
  };
};
