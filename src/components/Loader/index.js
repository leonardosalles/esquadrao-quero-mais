import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  loadingText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: theme.palette.primary.text
  },
  wrapperLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 70
  }
}))

const Loader = () => {
  const classes = useStyles()

  return (
    <Container>
      <div className={classes.wrapperLoading}>
        <CircularProgress />
        <span className={classes.loadingText}>Carregando...</span>
      </div>
    </Container>
  )
}

export default Loader