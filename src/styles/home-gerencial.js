import { makeStyles } from '@material-ui/core/styles'

const buttonFilterDefault = theme => ({
  boxShadow: 'none',
  marginRight: 10,
  height: 30,
  lineHeight: '15px',
  border:`1px solid ${theme.palette.primary.pill.background}`,
  color: theme.palette.primary.text,
  backgroundColor: 'transparent',
})

const homeGerencialStyles = makeStyles(theme => ({
  root: {

  },
  wrapperItemName: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.text
  },
  dataItem: {
    borderBottom: '0.55px solid #eaeaea',
    margin: '3px -4px',

    '&:last-child': {
      border: 'none'
    }
  },
  header: {
    '& div': {
      color: theme.palette.primary.text,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    '& span': {
      display: 'inline-block',
      marginLeft: 5
    }
  },
  spacerBottom: {
    paddingBottom: 70
  },
  buttonFilter: {
    ...buttonFilterDefault(theme)
  },
  buttonFilterActive: {
    ...buttonFilterDefault(theme),
    backgroundColor: theme.palette.primary.pill.background,
    color: '#fff'
  },
  wrapperItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: theme.palette.primary.text
  },
  wrapperItemPill: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4px 28px !important'
  },
  wrapperItemIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 34,
    color: '#4cac5b'
  },
  dangerIcon: {
    fontSize: 34,
    color: '#c24131'
  },
  '@media only screen and (max-width: 1200px)': {
    rootMobile: {
      width: '100%',
      overflowX: 'scroll',

      '& > div': {
        width: 1250
      }
    }
  }
}));

export default homeGerencialStyles