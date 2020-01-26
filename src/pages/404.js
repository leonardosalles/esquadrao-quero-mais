import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Container, Paper } from '@material-ui/core'
import globalStyles from '../styles/global'
import clsx from 'clsx'

const NotFoundPage = () => {
  const globalClasses = globalStyles()

  return (
    <Layout>
      <SEO title="404: Não Encontrado" />

      <Container>
        <Paper elevation={4} className={clsx({[globalClasses.pageBox]: true, [globalClasses.centered]: true })}>
          <h1>Não Encontrado :(</h1>
          <p>Você clicou em um link ou página não encontrada.</p>
        </Paper>
      </Container>
    </Layout>
  )
}

export default NotFoundPage
