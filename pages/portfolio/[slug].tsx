
import { ContentSlugParams, PortfolioPostData} from "../../types";

import Link from 'next/link'
import { getPortfolioSlugs, getPortfolioData } from "../../lib/content-generators/portfolio";

export async function getStaticProps({ params }: ContentSlugParams) {
    const postData = await getPortfolioData(params.slug);
    return {
        props: {
            ...postData,
        },
    };
};

export async function getStaticPaths() {
    const paths = getPortfolioSlugs();
    return {
        paths,
        fallback: false,
    };
}

export default function PortfolioPost(post: PortfolioPostData) {

    return (
        <>
            <Link href="/blog">
                <a>back...</a>
            </Link>
            <h1>{post.title}</h1>
            <p>{post.narrative}</p>
            <p>{post.date}</p>
        </>
    );
}
