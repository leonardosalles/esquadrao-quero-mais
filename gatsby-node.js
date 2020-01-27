/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/detalhe` page.
  if (page.path.match(/^\/detalhe/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/detalhe/*"
    // Update the page.
    createPage(page)
  }
}