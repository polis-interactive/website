import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";

export type WithLayout = {
    getLayout?: (page: ReactElement) => ReactNode
    wantsDark?: true
}

export type NextPageWithLayout = NextPage & WithLayout

export interface ReactChildrenType {
    children: ReactElement
}

export type ContentSlug = { slug: string }
export type ContentSlugParams = { params: { slug: string }}
export type ContentSlugPaths = Array<ContentSlugParams>


type BlogMetaData = {
    title: string
    date: Date
    description: string
}

export type BlogPostData = {
    slug: string,
    frontmatter: BlogMetaData,
    code: string
}

export type BlogMetaProps = { blogMeta: Array<BlogMetaData & ContentSlug> }

export type PortfolioData = {
    title: string
    date: string,
    hero?: string,
    location: string,
    client?: string,
    event?: string
    site?: string
    price?: number,
    credits? : Array<string>,
    media? : Array<string>,
    previous?: string,
    next?: string,
    type: string,
    category: string
    narrative: string
}


export type PortfolioPostData = ContentSlug & PortfolioData

export type PortfolioProps = { portfolioMeta: Array<PortfolioPostData> }
