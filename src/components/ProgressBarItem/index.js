import React from 'react'
import globalStyles from '../../styles/global'
import { toMonetary, toColoredStatus } from '../../services/utils'

const ProgressBarItem = ({percent, realizado, orcado}) => {
  const globalClasses = globalStyles()

  const getTextColor = () => {
    return toColoredStatus(percent, globalClasses.infoText, globalClasses.dangerText, globalClasses.successText)
  }

  const getProgressClass = () => {
    return toColoredStatus(percent, globalClasses.infoProgress, globalClasses.dangerProgress, globalClasses.successProgress)
  }

  return (
    <>
      <span className={getTextColor()}>
        Realizado: {toMonetary(realizado)}
      </span>

      <div className={globalClasses.progress}>
        <div className={getProgressClass()} style={{ width: percent > 100 ? '100%' : `${percent}%` }}></div>
      </div>

      <span className={globalClasses.orcadoText}>Orçado: {toMonetary(orcado)}</span>
    </>
  )
}

export default ProgressBarItem