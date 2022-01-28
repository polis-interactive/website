import {ContentSlugPaths, PortfolioData, PortfolioPostData} from "../../types";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const portfolioDirectory = path.join(process.cwd(), "content", "portfolio");

export function getPortfolioMeta() {

    const fileNames = fs.readdirSync(portfolioDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.yaml$/, '')

        // Read markdown file as string
        const fullPath = path.join(portfolioDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const data =  yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as object

        // Combine the data with the id
        return {
            slug,
            ...data
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

export function getPortfolioSlugs(): ContentSlugPaths {
    const fileNames = fs.readdirSync(portfolioDirectory)
    return fileNames.map(fileName => {
        return {
            params: {
                slug: fileName.replace(/\.yaml$/, '')
            }
        }
    })
}

export async function getPortfolioData(slug: string): Promise<PortfolioPostData> {
    const fullPath = path.join(portfolioDirectory, `${slug}.yaml`);
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const data =  yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as object

    // @ts-ignore
    return {
        slug,
        ...data
    }
}
