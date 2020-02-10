import React, {useState, useEffect} from 'react'


import SEO from '../../components/SEO'
import dashRegioesStyles from '../../styles/dash-regionais'
import {Container, Grid, Button} from '@material-ui/core'
import globalStyles from '../../styles/global'
import PaperCard from '../../components/PaperCard'
import {isLoggedIn} from '../../services/auth'
import {toMonetary, normalizePercentage} from '../../services/utils'
import GraphIcon from '../Image/graph'
import TargetIcon from '../Image/target'
import PercentIcon from '../Image/percent'
import LoadingPage from './loading-page'
import ProgressBarItem from '../ProgressBarItem'
import {esquadraoContext} from '../../provider'

import GraphLightIcon from '../Image/graph-light'
import TargetLightIcon from '../Image/target-light'
import PercentLightIcon from '../Image/percent-light'
import UserPointItem from '../../components/UserPointItem'

const DashRegioesPage = ({info}) => {

    const globalClasses = globalStyles()
    const classes = dashRegioesStyles()

    const [isLoading, setIsLoading] = useState(true)
    const [homeInfo, setHomeInfo] = useState({})

    useEffect(() => {
        setHomeInfo({
            data: info.data,
            config: info.config
        })

        if (info.data) {
            setIsLoading(false)
        }
    }, [info])

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    if ((!isLoggedIn() && typeof window !== 'undefined') || !info.data) {
        return null
    }

    return (
        <>
        <SEO title="Início"/>

        <div className={classes.rootMobile}>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperCard>
                            <span className={globalClasses.cardTitle}>Visão por Região</span>

                            <Grid container sapcing={1} className={classes.header}>
                                <Grid item xs={1}></Grid>

                                <Grid item xs={2} sm={2}>VENDA MERCANTIL</Grid>

                                <Grid item xs={2} sm={2}>EMPRÉSTIMO PESSOAL</Grid>

                                <Grid item xs={2} sm={2}>GARANTIA</Grid>

                                <Grid item xs={2} sm={2}>SPP</Grid>

                                <Grid item xs={2} sm={2}>MIFA VENCIDO</Grid>

                                <Grid item xs={1} sm={1}>TOTAL</Grid>

                            </Grid>
                            <br/>

                            <Grid container sapcing={2} className={classes.header}>
                                <Grid item xs={1}></Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>
                                <Grid item xs={1} sm={1}>RECUPERAR</Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>
                                <Grid item xs={1} sm={1}>RECUPERAR</Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>
                                <Grid item xs={1} sm={1}>RECUPERAR</Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>
                                <Grid item xs={1} sm={1}>RECUPERAR</Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>
                                <Grid item xs={1} sm={1}>RECUPERAR</Grid>

                                <Grid item xs={1} sm={1}>PROJ.</Grid>

                            </Grid>

                            {
                                homeInfo.data &&
                                homeInfo.data.map((item, index) => {
                                    return (
                                        <Grid container spacing={2} className={classes.dataItem} key={index}>
                                            <Grid item xs={1} sm={1} className={classes.wrapperItemName}>
                                                <p>
                                                    {item.regiao}
                                                </p>
                                            </Grid>

                                            <Grid item xs={1} sm={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoMercantil)}%
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} sm={1}className={classes.wrapperItemPill}>
                                                <div
                                                    className={item.recuperarMercantil <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                                    {toMonetary(item.recuperarMercantil)}
                                                </div>
                                            </Grid>

                                            <Grid item xs={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoEp)}%
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} className={classes.wrapperItemPill}>
                                                <div
                                                    className={item.recuperarEp <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                                    {toMonetary(item.recuperarEp)}
                                                </div>
                                            </Grid>

                                            <Grid item xs={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoGarantia)}%
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} className={classes.wrapperItemPill}>
                                                <div
                                                    className={item.recuperarGarantia <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                                    {toMonetary(item.recuperarGarantia)}
                                                </div>
                                            </Grid>

                                            <Grid item xs={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoSpp)}%
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} className={classes.wrapperItemPill}>
                                                <div
                                                    className={item.recuperarSpp <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                                    {toMonetary(item.recuperarSpp)}
                                                </div>
                                            </Grid>

                                            <Grid item xs={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoMifa)}%
                                                </div>
                                            </Grid>
                                            <Grid item xs={1} className={classes.wrapperItemPill}>
                                                <div
                                                    className={item.recuperarMifa <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                                    {toMonetary(item.recuperarMifa)}
                                                </div>
                                            </Grid>

                                            <Grid item xs={1} className={classes.wrapperItemPercentPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.projecaoTotal)}%
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }

                        </PaperCard>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </>
    )
}

export default DashRegioesPage
