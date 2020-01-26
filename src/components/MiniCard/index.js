import React from 'react'
import { Paper, Grid, CircularProgress } from '@material-ui/core'
import classNames from 'classnames'
import globalStyles from '../../styles/global'

const MiniCard = ({title, icon, value, className, isLoading}) => {
  const globalClasses = globalStyles()

  return(
    <Grid item xs={12} sm={4}>
      <Paper elevation={3} className={classNames({[globalClasses.miniCard]: true, [className]: true })}>
        <span className={globalClasses.miniCardTitle}>{title}</span>

        <Grid container>
          <Grid item xs={4}>
            {icon}
          </Grid>

          <Grid item xs={8} className={globalClasses.miniCardNumber}>
            {
              isLoading ?
                <CircularProgress color="inherit" size={32} />
              :
                value
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default MiniCard