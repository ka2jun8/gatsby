import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { ImageQuery } from "../types/graphqlTypes"

const Image = () => {
  const data: ImageQuery = useStaticQuery(imageQuery)

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

const imageQuery = graphql`
  query Image {
    placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Image
