import { makeStyles } from '@material-ui/core/styles'

const homeStyles = makeStyles(theme => ({
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    marginTop: 14,

    '& li': {
      display: 'inline',

      '& a': {
        fontSize: 16,
        fontWeight: '500',
        display: 'inline-block',
        padding: 6,
        color: theme.palette.primary.text,
        borderRadius: 3,
        cursor: 'pointer'
      }
    }
  },
  itemLink: {
    display: 'block',
    padding: 18,
    borderRadius: 3,
    cursor: 'pointer',

    '&:hover': {
      boxShadow: '0 0 0 2px #2e8ccc',
    }
  },
  activeItemList: {
    color: '#567fca !important',
    background: theme.palette.primary.searchPill.background
  },
  sarchIcon: {
    color: theme.palette.primary.text
  },
  searchInput: {
    '& input': {
      color: theme.palette.primary.searchInput.color,
      height: 35,
    }
  },
  title: {
    color: '#5e5c84',
    margin: 0,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6
  },
  subtitle: {
    color: theme.palette.primary.text,
    margin: 0,
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
  wrapperList: {
    marginTop: 32
  },
  imageInfo: {
    width: '100%',
    textAlign: 'center',
    opacity: 0.3,
    padding: '45px 0'
  },
  '@media only screen and (max-width: 580px)': {
    
  }
}));

export default homeStyles