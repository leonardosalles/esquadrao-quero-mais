import React, {useState, useEffect} from 'react'


import SEO from '../../components/SEO'
import homeRegionalStyles from '../../styles/home-regional'
import {Container, Grid, Button} from '@material-ui/core'
import globalStyles from '../../styles/global'
import PaperCard from '../../components/PaperCard'
import {isLoggedIn} from '../../services/auth'
import {toMonetary} from '../../services/utils'
import CloseIcon from '@material-ui/icons/Close'
import DoneIcon from '@material-ui/icons/Done'
import GiftIcon from '../Image/gift'
import GraphIcon from '../Image/graph'
import TargetIcon from '../Image/target'
import PercentIcon from '../Image/percent'
import LoadingPage from './loading-page'
import ProgressBarItem from '../ProgressBarItem'
import {esquadraoContext} from '../../provider'

import GiftLightIcon from '../Image/gift-light'
import GraphLightIcon from '../Image/graph-light'
import TargetLightIcon from '../Image/target-light'
import PercentLightIcon from '../Image/percent-light'

const HomeRegionalPage = ({info}) => {

    const globalClasses = globalStyles()
    const classes = homeRegionalStyles()

    const [isLoading, setIsLoading] = useState(true)
    const [homeInfo, setHomeInfo] = useState({})
    const [filter, setFilter] = useState('M')

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

    const actualData = filter === 'M' ? 'metasMensais' : 'metasTrimestrais'

    return (
        <>
        <SEO title="Início"/>

        <div className={classes.rootMobile}>
            <Container>
                <PaperCard>
                    <div className={classes.filterWrapper}>
                        <Button variant="contained"
                                className={filter === 'M' ? classes.buttonFilterActive : classes.buttonFilter}
                                onClick={() => setFilter('M')}>Mensal</Button>
                        <Button variant="contained"
                                className={filter === 'T' ? classes.buttonFilterActive : classes.buttonFilter}
                                onClick={() => setFilter('T')}>Trimestral</Button>
                    </div>

                    <esquadraoContext.Consumer>
                        {context => (
                            <Grid container className={classes.header}>
                                <Grid item xs={12} sm={2}></Grid>
                                <Grid item xs={12} sm={3}> </Grid>
                                <Grid item xs={12} sm={2}>
                                    {context.isDark ? <PercentLightIcon /> : <PercentIcon /> }<span>Atingimento</span>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    {context.isDark ? <GraphLightIcon /> : <GraphIcon /> }<span>Recuperar</span>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    {context.isDark ? <TargetLightIcon /> : <TargetIcon /> }<span>Meta</span>
                                </Grid>

                            </Grid>
                        )}
                    </esquadraoContext.Consumer>

                    {
                        homeInfo.data &&
                        homeInfo.data.kpisRegiao &&
                        homeInfo.data.kpisRegiao.data &&
                        homeInfo.data.kpisRegiao.data.map((item, index) => {
                            return (
                                <Grid container spacing={1} key={index} className={classes.dataItem}>
                                    <Grid item xs={2} className={classes.wrapperItem}>{item.indicador}</Grid>

                                    <Grid item xs={3} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.atingimento}
                                            realizado={item.realizado}
                                            orcado={item.orcado}
                                        />
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItemPill}>
                                        <div className={globalClasses.pill}>
                                            {item.atingimento}%
                                        </div>
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItemPill}>
                                        <div
                                            className={item.recuperar <= 0 ? globalClasses.successPill : globalClasses.dangerPill}>
                                            {toMonetary(item.recuperar)}
                                        </div>
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItemPill}>
                                        <div className={globalClasses.pill}>
                                            {toMonetary(item.meta)}
                                        </div>
                                    </Grid>

                                </Grid>
                            )
                        })
                    }
                </PaperCard>

                <PaperCard>
                    <span className={globalClasses.cardTitle}>Visão por filial</span>

                    <Grid container sapcing={2} className={classes.header}>
                        <Grid item xs={2}></Grid>

                        <Grid item xs={2}>Venda Mercantil</Grid>

                        <Grid item xs={2}>Empréstimo Pessoal</Grid>

                        <Grid item xs={2}>Garantia</Grid>

                        <Grid item xs={2}>SPP</Grid>

                        <Grid item xs={2}>Mifa Vencido</Grid>
                    </Grid>
                    {
                        homeInfo.data &&
                        homeInfo.data.filiais &&
                        homeInfo.data.filiais.indicadores &&
                        homeInfo.data.filiais.indicadores.map((item, index) => {
                            return (
                                <Grid container spacing={2} className={classes.dataItem} key={index}>
                                    <Grid item xs={2} className={classes.wrapperItemName}>
                                        <p>
                                            {item.nomeLoja} <br />
                                            <span className={classes.smallFont}>
                                            {'Rank Região: ' + item.rankRegiao}
                                            </span> <br />
                                            <span style={{fontSize:12, color: '#727272'}}>
                                            {'Rank Rede: ' + item.rankRede}
                                            </span>
                                        </p>
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.vendaMercantil.percAtingimento}
                                            realizado={item.vendaMercantil.realizado}
                                            orcado={item.vendaMercantil.metaAcumulada}
                                        />
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.vendaEp.percAtingimento}
                                            realizado={item.vendaEp.realizado}
                                            orcado={item.vendaEp.metaAcumulada}
                                        />
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.vendaGarantia.percAtingimento}
                                            realizado={item.vendaGarantia.realizado}
                                            orcado={item.vendaGarantia.metaAcumulada}
                                        />
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.vendaSpp.percAtingimento}
                                            realizado={item.vendaSpp.realizado}
                                            orcado={item.vendaSpp.metaAcumulada}
                                        />
                                    </Grid>

                                    <Grid item xs={2} className={classes.wrapperItem}>
                                        <ProgressBarItem
                                            percent={item.mifa.percAtingimento}
                                            realizado={item.mifa.realizado}
                                            orcado={item.mifa.metaAcumulada}
                                        />
                                    </Grid>

                                    <Grid item xs={1}></Grid>
                                </Grid>
                            )
                        })
                    }
                </PaperCard>

                <div className={classes.spacerBottom}></div>
            </Container>
        </div>
        </>
    )
}

export default HomeRegionalPage
