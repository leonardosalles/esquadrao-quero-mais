import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from '../Header'
import { isLoggedIn } from '../../services/auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import globalStyles from '../../styles/global'
import { esquadraoContext } from '../../provider'

const Layout = ({ children }) => {
  const globalClasses = globalStyles()

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <esquadraoContext.Consumer>
          {context => (
            <React.Fragment>
              <div
                className={globalClasses.rootPage}
              >
                <CssBaseline />

                {
                  isLoggedIn() ?
                    <Header siteTitle={data.site.siteMetadata.title} />
                  :
                    null
                }

                <div
                  style={{
                    margin: `0 auto`,
                    maxWidth: '100%'
                  }}
                >

                  <style>{`a { text-decoration: none !important; }`}</style>

                  <main>{children}</main>
                </div>
              </div>
            </React.Fragment>
          )}
        </esquadraoContext.Consumer>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
