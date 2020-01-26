import React from 'react'

import SEO from '../SEO'
import { Container, TextField, Button, Snackbar, CircularProgress } from '@material-ui/core'
import { navigate } from 'gatsby'
import loginStyles from '../../styles/login'
import { handleLogin, isLoggedIn, setUserSession, setSessionToken } from '../../services/auth'
import LogoEsquadrao from '../Image/logo-esquadrao'
import LogoEsquadraoMini from '../Image/logo-esquadrao-mini'
import LogoBig from '../Image/logo-big'
import LogoMobileMedium from '../Image/logo-mobile-medium'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const LoginPage = () => {
  const classes = loginStyles()
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const isInvalidUser = () => {
    if (user && !user.usuario && submitted) {
      return true
    }

    return
  }

  const isInvalidPassword = () => {
    if (user && !user.senha && submitted) {
      return true
    }

    return
  }

  const [user, setUser] = React.useState({ usuario: '', senha: '' })

  const handleUpdate = event => {
    const userObj = Object.assign(user, {
      [event.target.name]: event.target.value,
    })

    setUser(userObj)
    setSubmitted(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitted(true)

    if (user && (!user.usuario || !user.senha)) {
      return
    }

    setLoading(true)

    const response = await handleLogin(user)

    if (response && response.sucesso) {
      setUserSession({ ...response.usuario, perspectiva: response.perspectiva, ...response.perfil })
      setSessionToken(response.tokenApi)
      navigate(`/`)
    } else {
      setMessage('Matrícula ou senha inválidos')
      setOpen(true)
      setUser({ usuario: '', senha: '' })
      setSubmitted(false)

      setUserSession({})
      setSessionToken(null)

      document.querySelectorAll('input').forEach(item => { item.value = '' })
    }

    setLoading(false)
  }

  if (isLoggedIn()) {
    navigate(`/`)
  }

  return (
    <>
      <div className={classes.root}>
        <SEO title="Login" />

        <Container className={classes.wrapperLogoEsquadrao}>
          <LogoEsquadrao />
        </Container>

        <div className={classes.wrapperForm}>
          <div className={classes.wrapperLogo}>
            <LogoBig />
          </div>

          <div className={classes.wrapperLogoMobile}>
            <LogoMobileMedium />
            <LogoEsquadraoMini />
          </div>

          <h5 className={classes.formTitle}>LOGIN</h5>

          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <TextField
              label="Matrícula"
              name="usuario"
              autoComplete="username"
              onChange={handleUpdate}
              fullWidth
              className={classes.usernameField}
              error={isInvalidUser()}
            />

            <TextField
              label="Senha"
              name="senha"
              type="password"
              autoComplete="password"
              onChange={handleUpdate}
              fullWidth
              error={isInvalidPassword()}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.btnLogin}
            >
              {
                loading ?
                  <CircularProgress size={24} color="inherit" />
                :
                  <span>Login</span>
              }
              
            </Button>
          </form>

          <p className={classes.copyright}>
            @ Lojas Quero-Quero S.A | QQLabs
          </p>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} color="error">
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default LoginPage
