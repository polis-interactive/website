
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getBlogSlugs, getBlogData } from "lib/content-generators/blog";
import { BlogPostData, ContentSlugParams } from "types";

import Link from 'next/link'

export async function getStaticProps({ params }: ContentSlugParams) {
    const postData = await getBlogData(params.slug);
    return {
        props: {
            ...postData,
        },
    };
};

export async function getStaticPaths() {
    const paths = getBlogSlugs();
    return {
        paths,
        fallback: false,
    };
}

export default function BlogPost({ code, frontmatter }: BlogPostData) {
    const Component = useMemo(() => getMDXComponent(code), [code]);

    return (
        <>
            <Link href="/blog">
                <a>back...</a>
            </Link>
            <h1>{frontmatter.title}</h1>
            <p>{frontmatter.description}</p>
            <p>{frontmatter.date}</p>
            <article>
                <Component />
            </article>
        </>
    );
}
