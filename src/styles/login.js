import { makeStyles } from '@material-ui/core/styles'

const loginStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.accent.main,
    position: 'fixed',
    left: 0,
    height: '100%',
    width: '100%',
    top: 0,
  },
  wrapperForm: {
    height: '100%',
    position: 'absolute',
    right: 0,
    width: '35%',
    background: '#fff',
    top: 0,
    padding: '100px 48px',
    
  },
  wrapperLogo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapperLogoEsquadrao: {
    paddingLeft: '10%',
  },
  formTitle: {
    color: theme.palette.accent.main,
    fontSize: 18
  },
  usernameField: {
    marginBottom: 20
  },
  btnLogin: {
    marginTop: 80,
    backgroundColor: theme.palette.accent.main
  },
  copyright: {
    position: 'absolute',
    bottom: 6,
    color: theme.palette.primary.text,
    fontSize: 16
  },
  wrapperLogoMobile: {
    display: 'none'
  },
  '@media only screen and (max-width: 580px)': {
    wrapperForm: {
      padding: 24,
      position: 'fixed',
      left: 0,
      right: 0,
      width: '100%',
    },
    wrapperLogo: {
      display: 'none'
    },
    wrapperLogoMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }
}));

export default loginStyles