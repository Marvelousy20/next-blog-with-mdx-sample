import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import remarkMdxImages from 'remark-mdx-images';

interface Frontmatter {
    title: string,
    date: string,
    description: string
}

const postsDirectory = path.join(process.cwd(), 'posts');

// Handles all page font-matter and returns it
export function getBlogPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);

    // array container all fileNames is returned here
    const blogPostData = fileNames.map(fileName => {
        // get slug
        const slug = fileName.replace(/\.mdx$/, "");

        const fullPath = path.join(postsDirectory, fileName);

        // read file content of each posts
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContent);
        return {
            slug,
            ...data as Frontmatter,
        }
    })

    // Sort posts by date
    return blogPostData.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        return -1;
    });
}

// Get all possible slugs/Ids
export const getBlogsId = async () => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                slug: fileName.replace(/\.mdx$/, "")
            }
        }
    })
}

// Get blog contents by Id
export const getBlogContentById = async (slug: string) => {
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const mdxSource = fs.readFileSync(filePath, "utf8");
    
    // We parse the contents here instead of using graymatter 
    const { code, frontmatter } = await bundleMDX({
        source: mdxSource,
        mdxOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
            options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];
            return options;
        },
    })

    return {
        slug,
        code,
        frontmatter,
    }
}
