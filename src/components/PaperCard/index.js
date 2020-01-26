import React from 'react'
import globalStyles from '../../styles/global';
import { Paper } from '@material-ui/core';

const PaperCard = ({children}) => {
  const globalClasses = globalStyles()

  return(
    <Paper elevation={3} className={globalClasses.cardDefault}>
      {children}
    </Paper>
  )
}

export default PaperCard