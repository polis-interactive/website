import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";

import yaml from "js-yaml";

import remarkGfm from "remark-gfm"
// @ts-ignore
import rehypePrism from '@mapbox/rehype-prism'
import {BlogPostData, ContentSlugPaths} from "types";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export function getBlogMeta() {

    const fileNames = fs.readdirSync(blogDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.mdx$/, '')

        // Read markdown file as string
        const fullPath = path.join(blogDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents, {
            engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
            }
        })

        // Combine the data with the id
        return {
            slug,
            ...matterResult.data
        }
    })

    // @ts-ignore
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export function getBlogSlugs(): ContentSlugPaths {
    const fileNames = fs.readdirSync(blogDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                slug: fileName.replace(/\.mdx$/, '')
            }
        }
    })
}

export async function getBlogData(slug: string): Promise<BlogPostData> {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    const source = fs.readFileSync(fullPath, "utf8");

    const { code, frontmatter } = await bundleMDX({
        source: source,
        grayMatterOptions(options) {
            options.engines = {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
            };
            return options;
        },
        xdmOptions(options) {
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm]
            options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism]
            return options
        },
    })

    return {
        slug,
        // @ts-ignore
        frontmatter,
        code,
    };
}
