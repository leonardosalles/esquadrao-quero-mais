import { makeStyles } from '@material-ui/core/styles'

const borderSize = 2

const insetTextCore = {
  display: 'block',
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  fontSize: '13px'
}

const homeGerencialStyles = makeStyles(theme => ({
  root: {
    marginTop: 35,
    padding: '0 5px !important',
    marginBottom: 70
  },
  header: {
    backgroundColor: theme.palette.primary.tableHeader.background,
    color: theme.palette.primary.tableHeader.color,
    height: 35,
    //borderTop: `${borderSize}px solid`,

    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRight: `${borderSize}px solid #000`,
    }
  },
  subheader: {
    backgroundColor: theme.palette.primary.tableSubheader.background,
    color: theme.palette.primary.tableSubheader.color,
    height: 18,
    //borderBottom: `${borderSize}px solid`,
    //borderTop: `${borderSize}px solid`,

    '& div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  },
  subheaderInsetItem: {
    borderRight: `${borderSize}px solid #000`,
    fontWeight: '500',
    fontSize: '13px',

    '&:first-child': {
      borderLeft: `${borderSize}px solid`,
    }
  },
  insetItemValue: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10px !important',
    fontSize: '12px',
    paddingTop: '7px !important',
    paddingLeft: '0 !important',
    position: 'relative'
  },
  insetItemValueCentered: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '34px !important',
    fontSize: '12px',
    paddingTop: '7px !important',
    paddingLeft: '0 !important',
    position: 'relative'
  },
  insetItemValueFirst: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: `${borderSize}px solid`,
    borderRight: `${borderSize}px solid`,
    fontSize: 11,
    paddingTop: '7px !important',
    paddingLeft: '0 !important',
    background: theme.palette.primary.table.evenColor,
    textAlign: 'center'
  },
  insetItem: {
    borderRight: `${borderSize}px solid`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insetItemValueCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
  },
  item: {
    height: 46,
    '&:nth-child(even)': {
      background: theme.palette.primary.table.evenColor
    },
    '&:nth-child(odd)': {
      background: theme.palette.primary.table.oddColor
    },

    '&:last-child': {
      //borderBottom: `${borderSize}px solid`,
    }
  },
  insetTextItem: {
    position: 'relative'
  },
  insetText: {
    ...insetTextCore,
    left: -12,
  },
  insetTextCenter: {
    ...insetTextCore,
    left: -3,
  },
  normalizedCard: {
    marginTop: -24
  },
  '@media only screen and (max-width: 1200px)': {
    insetText: {
      display: 'block',
      position: 'absolute',
      left: -16,
      width: '100%',
      textAlign: 'center',
      fontSize: '8px'
    },
    insetTextCenter: {
      fontSize: 8
    },
    insetItemValueCentered: {
      marginLeft: -14,
      marginRight: 6
    },
    subheaderInsetItem: {
      fontSize: '8px'
    },
    rootMobile: {
      width: '100%',
      overflowX: 'scroll',

      '& > div': {
        width: 1400
      }
    }
  }
}));

export default homeGerencialStyles