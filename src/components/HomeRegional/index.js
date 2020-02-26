import React, {useState, useEffect} from 'react'


import SEO from '../../components/SEO'
import homeRegionalStyles from '../../styles/home-regional'
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

    const actualData = filter === 'M' ? 'mensal' : filter === 'S' ? 'semanal' : 'trimestral'

    return (
        <>
        <SEO title="Início"/>

        <div className={classes.rootMobile}>
            <Container maxWidth="xl">
                <Grid container spacing={2}>

                    <Grid item xs={9}>
                        <PaperCard>
                            <div className={classes.filterWrapper}>
                                <Button variant="contained"
                                        className={filter === 'S' ? classes.buttonFilterActive : classes.buttonFilter}
                                        onClick={() => setFilter('S')}>Semanal</Button>

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
                                            {context.isDark ? <PercentLightIcon /> :
                                                <PercentIcon /> }<span>Atingimento</span>
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
                                homeInfo.data[actualData] &&
                                homeInfo.data[actualData].kpisRegiao &&
                                homeInfo.data[actualData].kpisRegiao.data &&
                                homeInfo.data[actualData].kpisRegiao.data.map((item, index) => {
                                    return (
                                        <Grid container spacing={1} key={index} className={classes.dataItem}>
                                            <Grid item xs={2} className={classes.wrapperItem}>{item.indicador}</Grid>

                                            <Grid item xs={3} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.atingimento}
                                                    realizado={item.realizado}
                                                    orcado={item.orcado}
                                                    orcadoTitle={item.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItemPill}>
                                                <div className={globalClasses.pill}>
                                                    {normalizePercentage(item.atingimento)}%
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

                            <br/>
                            <span
                                className={classes.smallFont}>{`Última Atualização: ${homeInfo.data[actualData].kpisRegiao.dtUltAtualizacao}`}</span>
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
                                homeInfo.data[actualData] &&
                                homeInfo.data[actualData].filiais &&
                                homeInfo.data[actualData].filiais.indicadores &&
                                homeInfo.data[actualData].filiais.indicadores.map((item, index) => {
                                    return (
                                        <Grid container spacing={2} className={classes.dataItem} key={index}>
                                            <Grid item xs={2} className={classes.wrapperItemName}>
                                                <p>
                                                    {item.nomeLoja} <br />
                                                    <span className={classes.smallFont}>
                                            {'Rank Região: ' + item.rankRegiao}
                                            </span> <br />
                                                    <span style={{fontSize: 12, color: '#727272'}}>
                                            {'Rank Rede: ' + item.rankRede}
                                           </span> <br />
                                                    <span style={{fontSize: 12, color: '#727272'}}>
                                                {'Atingimento Total: ' + normalizePercentage(item.atingimentoTotal)}%
                                            </span>
                                                </p>
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.vendaMercantil.percAtingimento}
                                                    realizado={item.vendaMercantil.realizado}
                                                    orcado={item.vendaMercantil.metaAcumulada}
                                                    orcadoTitle={item.vendaMercantil.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.vendaEp.percAtingimento}
                                                    realizado={item.vendaEp.realizado}
                                                    orcado={item.vendaEp.metaAcumulada}
                                                    orcadoTitle={item.vendaEp.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.vendaGarantia.percAtingimento}
                                                    realizado={item.vendaGarantia.realizado}
                                                    orcado={item.vendaGarantia.metaAcumulada}
                                                    orcadoTitle={item.vendaGarantia.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.vendaSpp.percAtingimento}
                                                    realizado={item.vendaSpp.realizado}
                                                    orcado={item.vendaSpp.metaAcumulada}
                                                    orcadoTitle={item.vendaSpp.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.mifa.percAtingimento}
                                                    realizado={item.mifa.realizado}
                                                    orcado={item.mifa.metaAcumulada}
                                                    orcadoTitle={item.mifa.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                    )
                                })
                            }

                        </PaperCard>


                    </Grid>
                    <Grid item xs={3}>
                        <PaperCard>
                            <span className={globalClasses.cardTitle}>Classificação</span>
                            {
                                homeInfo.data &&
                                homeInfo.data[actualData] &&
                                homeInfo.data[actualData].regioesMaisClassificadas ?
                                    homeInfo.data[actualData].regioesMaisClassificadas.map((item, index) => {
                                        return (
                                            <UserPointItem
                                                key={index}
                                                index={index}
                                                medal={false}
                                                height={55}
                                                customText={`Atingimento: ${normalizePercentage(item.atingimento)}%` }
                                                username={item.nomeRegiao}
                                            />
                                        )
                                    })
                                    :
                                    null
                            }
                        </PaperCard>
                    </Grid>

                </Grid>

            </Container>

            <Container maxWidth="xl">
            </Container>
        </div>
        </>
    )
}

export default HomeRegionalPage
