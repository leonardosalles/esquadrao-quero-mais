import React, {useState, useEffect} from 'react'

import SEO from '../../components/SEO'
import homeGerencialStyles from '../../styles/home-gerencial'
import {Container, Grid, Button} from '@material-ui/core'
import globalStyles from '../../styles/global'
import PaperCard from '../../components/PaperCard'
import {isLoggedIn} from '../../services/auth'
import {toMonetary, normalizePercentage} from '../../services/utils'
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

import UserPointItem from '../../components/UserPointItem'

const HomeGerencialPage = ({info}) => {

    const globalClasses = globalStyles()
    const classes = homeGerencialStyles()

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

    const actualData = filter === 'M' ? 'metasMensais' : filter === 'S' ? 'metasSemanais' : 'metasTrimestrais'
    const actualDataRank = filter === 'M' ? 'rankMensal' : filter === 'S' ? 'rankSemanal' : 'rankTrimestral'
    const actualDataVendedor = filter === 'M' ? 'metasPorVendedorMensal' : filter === 'S' ? 'metasPorVendedorSemanal' : 'metasPorVendedorTrimestral'
    const actualDataCaixa = filter === 'M' ? 'metasPorCaixaMensal' : filter === 'S' ? 'metasPorCaixaSemanal' : 'metasPorCaixaTrimestral'
    const actualDataDtAtualizacao = filter === 'M' ? 'dtUltAtualizacaMensal' : filter === 'S' ? 'dtUltAtualizacaSemanal' : 'dtUltAtualizacaTrimestre'

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
                                        <Grid item xs={12} sm={3}></Grid>
                                        <Grid item xs={12} sm={2}>
                                            {context.isDark ? <PercentLightIcon /> :
                                                <PercentIcon /> }<span>Atingimento</span>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            {context.isDark ? <GraphLightIcon /> : <GraphIcon /> }<span>Recuperar</span>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            {context.isDark ? <TargetLightIcon /> :
                                                <TargetIcon /> }<span>Meta Mensal</span>
                                        </Grid>
                                        {
                                            filter !== 'S' ?
                                                <Grid item xs={12} sm={1}>
                                                    {context.isDark ? <GiftLightIcon /> :
                                                        <GiftIcon /> }<span>Habilita</span>
                                                </Grid>
                                                :
                                                <Grid item xs={12} sm={1}>
                                                </Grid>
                                        }
                                    </Grid>
                                )}
                            </esquadraoContext.Consumer>

                            {
                                homeInfo.data &&
                                homeInfo.data[actualData] &&
                                homeInfo.data[actualData].map((item, index) => {
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

                                            {
                                                filter !== 'S' ?
                                                    <Grid item xs={1} className={classes.wrapperItemIcon}>
                                                        {
                                                            item.habilita ?
                                                                <DoneIcon className={classes.successIcon} size={38}/>
                                                                :
                                                                <CloseIcon className={classes.dangerIcon} size={38}/>
                                                        }
                                                    </Grid>
                                                    :
                                                    <Grid item xs={1} className={classes.wrapperItemIcon}>
                                                    </Grid>
                                            }
                                        </Grid>
                                    )
                                })
                            }

                            <br/>
                            <span
                                className={classes.smallFont}>{`Última Atualização: ${homeInfo.data[actualDataDtAtualizacao]}`}</span>

                        </PaperCard>

                        <PaperCard>
                            <span className={globalClasses.cardTitle}>Visão por Vendedor</span>

                            <Grid container sapcing={2} className={classes.header}>
                                <Grid item xs={3}></Grid>

                                <Grid item xs={2}>Venda Mercantil</Grid>

                                <Grid item xs={2}>Empréstimo Pessoal</Grid>

                                <Grid item xs={2}>Garantia</Grid>

                                <Grid item xs={2}>SPP</Grid>
                            </Grid>

                            {
                                homeInfo.data &&
                                homeInfo.data[actualDataVendedor] &&
                                homeInfo.data[actualDataVendedor].map((item, index) => {
                                    return (
                                        <Grid container spacing={2} className={classes.dataItem} key={index}>
                                            <Grid item xs={3} className={classes.wrapperItemName}>
                                                {item.nome}
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.vendaMercantil.atingimento}
                                                    realizado={item.vendaMercantil.realizado}
                                                    orcado={item.vendaMercantil.orcado}
                                                    orcadoTitle={item.vendaMercantil.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.emprestimoPessoal.atingimento}
                                                    realizado={item.emprestimoPessoal.realizado}
                                                    orcado={item.emprestimoPessoal.orcado}
                                                    orcadoTitle={item.emprestimoPessoal.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.garantia.atingimento}
                                                    realizado={item.garantia.realizado}
                                                    orcado={item.garantia.orcado}
                                                    orcadoTitle={item.garantia.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={2} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.spp.atingimento}
                                                    realizado={item.spp.realizado}
                                                    orcado={item.spp.orcado}
                                                    orcadoTitle={item.spp.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={1}></Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </PaperCard>

                        <PaperCard>
                            <span className={globalClasses.cardTitle}>Visão por Caixa</span>

                            <Grid container sapcing={2} className={classes.header}>
                                <Grid item xs={3}></Grid>

                                <Grid item xs={4}>EP+</Grid>

                                <Grid item xs={4}>S+</Grid>
                            </Grid>

                            {
                                homeInfo.data &&
                                homeInfo.data[actualDataCaixa] &&
                                homeInfo.data[actualDataCaixa].map((item, index) => {
                                    return (
                                        <Grid container spacing={2} className={classes.dataItem} key={index}>
                                            <Grid item xs={3} className={classes.wrapperItemName}>
                                                {item.nome}
                                            </Grid>

                                            <Grid item xs={4} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.eMais.atingimento}
                                                    realizado={item.eMais.realizado}
                                                    orcado={item.eMais.orcado}
                                                    orcadoTitle={item.eMais.periodo}
                                                />
                                            </Grid>

                                            <Grid item xs={4} className={classes.wrapperItem}>
                                                <ProgressBarItem
                                                    percent={item.sMais.atingimento}
                                                    realizado={item.sMais.realizado}
                                                    orcado={item.sMais.orcado}
                                                    orcadoTitle={item.sMais.periodo}
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
                                homeInfo.data[actualDataRank] &&
                                homeInfo.data[actualDataRank].map((item, index) => {
                                    return (
                                        <>
                                        <UserPointItem
                                            key={index}
                                            index={index}
                                            medal={false}
                                            height={80}
                                            username={item.nmFilial}
                                            customText={
                                                `Atingimento: ${normalizePercentage(item.atingimento)}% Rank Rede: ${item.rankRede}`
                                            }>
                                        </UserPointItem>
                                        </>
                                    )
                                })
                            }
                        </PaperCard>
                    </Grid>


                </Grid>

                <div className={classes.spacerBottom}></div>
            </Container>
        </div>
        </ >
    )
}

export default HomeGerencialPage
