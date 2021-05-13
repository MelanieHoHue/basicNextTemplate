import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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