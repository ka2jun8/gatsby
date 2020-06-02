import { GatsbyNode } from "gatsby"

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

type Node = {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

type Data = {
  allMarkdownRemark: {
    edges: {
      node: Node
    }[]
  }
}

export type PageContextData = {
  slug: string
  previous: Node
  next: Node
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.tsx')
  const result = await graphql<Data>(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )
  if(result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index-1].node

    createPage<PageContextData>({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if(node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
