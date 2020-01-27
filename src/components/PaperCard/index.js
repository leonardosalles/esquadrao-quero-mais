import React from 'react'
import globalStyles from '../../styles/global';
import { Paper } from '@material-ui/core';

const PaperCard = ({children, spacing}) => {
  const globalClasses = globalStyles()

  return(
    <Paper elevation={3} className={spacing === 0 ? globalClasses.cardDefaultNone : globalClasses.cardDefault}>
      {children}
    </Paper>
  )
}

export default PaperCard