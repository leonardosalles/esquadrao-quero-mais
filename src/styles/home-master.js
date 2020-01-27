import { makeStyles } from '@material-ui/core/styles'

const homeStyles = makeStyles(theme => ({
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    marginTop: 8,

    '& li': {
      display: 'inline',

      '& a': {
        color: '#506c9e',
        fontSize: 16,
        fontWeight: '500',
        display: 'inline-block',
        padding: '12px 6px'
      }
    }
  },
  searchInput: {
    '& input': {
      color: '#fff',
      height: 35,
    }
  },
  title: {
    color: '#5e5c84',
    margin: 0,
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  detail: {
    color: theme.palette.primary.text,
    margin: 0,
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  '@media only screen and (max-width: 580px)': {
    
  }
}));

export default homeStyles