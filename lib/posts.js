import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {

    // get file names under ./posts
    const fileNames = fs.readdirSync(postsDirectory)
    
    const allPostesData = fileNames.map(fileName => {
        
        // remove ".md" from filr name to get id
        const id = fileName.replace(/\.md$/, '')

        // read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    // sort posts by date
    return allPostesData.sort((a,b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //     {
    //         params: {
    //             id: 'first-file-name'
    //         }
    //     },
    //     {
    //         params: {
    //             id: 'second-file-name'
    //         }
    //     }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // use reamrk to convert markdown into HTML string
    const processedContent = await remark ()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and cpntentHtml
    return {
        id, 
        contentHtml,
        ...matterResult.data
    }
}