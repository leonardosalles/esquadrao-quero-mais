import React from 'react'
import { Grid } from '@material-ui/core'
import CupomMini from '../Image/cupom-mini'
import CupomMiniLight from '../Image/cupom-mini-light'
import { makeStyles } from '@material-ui/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import { esquadraoContext } from '../../provider'

const useStyles = makeStyles(theme => ({
  root: {
    height: 65,
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    padding: '0 16px',
    position: 'relative',

    '&:after': {
      content: '""',
      height: 1,
      width: '90%',
      position: 'absolute',
      left: '5%',
      background: '#dedede',
      bottom: 3
    },

    '& strong': {
      display: 'block',
      fontSize: 16,
      color: theme.palette.primary.strongText,
    },

    '& span': {
      color: '#939393',
    },

    '&:last-child:after': {
      content: 'none'
    }
  },
  cupounImage: {
    textAlign: 'center'
  },
  columnIndex: {
    color: theme.palette.primary.accentText,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 6,
    background: theme.palette.primary.accentBackground,
    fontWeight: '700',
    transition: '.3s ease-in-out'
  },
  loadingWrapper: {
    height: 95
  },
  '@media only screen and (max-width: 580px)': {
    root: {
      padding: 0
    }
  }
}))

const UserPointItem = ({username, points, medalActive, index, isLoading, medal, height, customText}) => {
  const classes = useStyles()

  if (!username) {
    return null
  }

  if (isLoading) {
    return (
      <Grid container spacing={3} className={classes.loadingWrapper}>
        <Grid item xs={12}>
          <Skeleton height={95} />
        </Grid>
      </Grid>
    )
  }

  return(
    <esquadraoContext.Consumer>
      {context => (
        <Grid container spacing={0} className={classes.root} { ...height ? { style: { height }} : ''}>
          <Grid xs={1} className={classes.columnIndex} item>{index >= 0 ? (index + 1) : ''}</Grid>

          
              <Grid xs={medal !== false ? 3 : 2} sm={medal !== false ? 2 : 1} item className={classes.cupounImage}>
                {
                  medal !== false ?
                  <span>
                    {
                      context.isDark ?
                        <CupomMiniLight />
                      :
                        <CupomMini />
                    }
                  </span>
                :
                  null
                }
              </Grid>

          <Grid xs={8} sm={9} item>
            <strong>{username}</strong>

            { points ? <span>{points} cupons</span> : null }
          </Grid>

          <Grid xs={8} sm={9} item >
            <span>{customText}</span>
          </Grid>

        </Grid>
      )}
    </esquadraoContext.Consumer>
  )
}

export default UserPointItem