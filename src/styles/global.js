import { makeStyles } from '@material-ui/core/styles'

const progressInset = {
  height: 12
};

const pill = theme => ({
  height: 32,
  color: '#fff',
  padding: '0 10px',
  display: 'inline-flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
  backgroundColor: theme.palette.primary.pill.background
});

const circle = theme => ({
  width: 14,
  height: 14,
  borderRadius: 9,
  border: '1px solid',
  marginLeft: 4,
  position: 'absolute',
  right: 16,
  marginTop: -1
})

const globalStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: `${theme.palette.primary.background} !important`,
    }
  },
  rootPage: {
    minHeight: '100vh',
    paddingTop: 74,
    backgroundColor: `${theme.palette.primary.background} !important`,
    transition: '.3s ease-in-out !important'
  },
  primaryRoundedBlock: {
    color: '#fff',
    display: 'inline-flex',
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    fontSize: 26,
    fontWeight: 500,
    padding: '0 26px',
  },
  cardTitle: {
    color: theme.palette.primary.text,
    fontSize: 16
  },
  cardTitleBold: {
    color: theme.palette.primary.text,
    fontSize: 16,
    fontWeight: 500
  },
  cardDefault: {
    padding: '38px 18px',
    marginTop: 24,
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0), 0 10px 10px rgba(0, 0, 0, 0.10)',
    backgroundColor: `${theme.palette.primary.cardBackground} !important`,
    transition: '.3s ease-in-out'
  },
  cardDefaultNone: {
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0), 0 10px 10px rgba(0, 0, 0, 0.10)',
    backgroundColor: `${theme.palette.primary.cardBackground} !important`,
    transition: '.3s ease-in-out',
    marginTop: 12,
  },
  pointsTile: {
    position: 'relative',
    color: theme.palette.primary.text,
    backgroundColor: '#e5e5e5',
    borderRadius: 50,
    height: 50,
    width: '80%',
    margin: '26px 50px 40px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  pointsTileMedal: {
    position: 'absolute',
    left: 0,
    marginTop: 10
  },
  orcadoText: {
    textAlign: 'right',
    marginTop: 6
  },
  miniCard: {
    marginTop: 34,
    height: 110,
    color: '#fff !important',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 16px',
    borderRadius: 12,
    
    '& img': {
      opacity: '0.6 !important'
    },

    '& span': {
      marginBottom: 8,
      fontWeight: 500,
    }
  },
  miniCardStore: {
    background: 'linear-gradient(90deg, rgba(196,93,130,1) 0%, rgba(158,94,150,1) 100%)',
  },
  miniCardRegion: {
    background: 'linear-gradient(90deg, rgba(122,100,173,1) 0%, rgba(82,79,166,1) 100%)',
  },
  miniCardWeb: {
    background: 'linear-gradient(90deg, rgba(116,184,228,1) 0%, rgba(113,139,198,1) 100%)',
  },
  miniCardNumber: {
    textAlign: 'right',
    fontSize: 38,
    fontWeight: 500,
  },
  progress: {
    backgroundColor: theme.palette.primary.progressBackground,
    height: 12,
    width: '100%'
  },
  infoProgress: {
    ...progressInset,
    backgroundColor: '#4f6fb3'
  },
  dangerProgress: {
    ...progressInset,
    backgroundColor: '#c24131'
  },
  successProgress: {
    ...progressInset,
    backgroundColor: '#4cac5b'
  },
  infoText: {
    color: '#4f6fb3',
    marginBottom: 6,
  },
  dangerText: {
    color: theme.palette.error.main,
    marginBottom: 6,
  },
  successText: {
    color: '#4cac5b',
    marginBottom: 6,
  },
  pill: {
    ...pill(theme)
  },
  infoPill: {
    ...pill(theme),
    backgroundColor: '#4f6fb3'
  },
  dangerPill: {
    ...pill(theme),
    backgroundColor: '#c24131'
  },
  successPill: {
    ...pill(theme),
    backgroundColor: '#4cac5b'
  },
  successCircle: {
    ...circle(theme),
    backgroundColor: '#4cac5b',
    borderColor: '#1e6128'
  },
  dangerCircle: {
    ...circle(theme),
    backgroundColor: '#c24131',
    borderColor: '#8e2e22'
  },
  infoCircle: {
    ...circle(theme),
    backgroundColor: '#4f6fb3',
    borderColor: '#4f6fb3'
  },
  warningCircle: {
    ...circle(theme),
    backgroundColor: '#ffd043',
    borderColor: '#c19612'
  },
  '@media only screen and (max-width: 580px)': {
    pointsTile: {
      width: '100%'
    },
    miniCard: {
      marginTop: 0
    },
    cardTitle: {
      marginBottom: 24,
      display: 'block'
    },
    cardDefault: {
      marginBottom: -10,
      padding: '38px 8px'
    }
  }
}));

export default globalStyles