import React from 'react'
import globalStyles from '../../styles/global'
import {toMonetary, toColoredStatus} from '../../services/utils'

const ProgressBarItem = ({percent, realizado, orcado, orcadoTitle}) => {
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
            <div className={getProgressClass()} style={{width: percent > 100 ? '100%' : `${percent}%`}}></div>
        </div>

        <span
            className={globalClasses.orcadoText}>{'Meta ' + (orcadoTitle ? orcadoTitle : '') + ' ' + toMonetary(orcado)}</span>
        </>
    )
}

export default ProgressBarItem