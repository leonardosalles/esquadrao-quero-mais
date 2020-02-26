import React, {useState, useEffect} from 'react'

import SEO from '../../components/SEO'
import homeStyles from '../../styles/home'
import {Container, Grid} from '@material-ui/core'
import globalStyles from '../../styles/global'
import Store from '../../components/Image/store'
import Map from '../../components/Image/map'
import Web from '../../components/Image/web'
import PaperCard from '../../components/PaperCard'
import MiniCard from '../../components/MiniCard'
import UserPointItem from '../../components/UserPointItem'
import Skeleton from '@material-ui/lab/Skeleton'
import {isLoggedIn} from '../../services/auth'
import {toFixed, toMonetary} from '../../services/utils'
import ProgressBarItem from '../ProgressBarItem'

const HomePage = ({info}) => {

    const globalClasses = globalStyles()
    const classes = homeStyles()

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

    if ((!isLoggedIn() && typeof window !== 'undefined')) {
        return null
    }

    return (
        <>
        <SEO title="Início"/>

        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PaperCard>
                        <Grid container>
                            {
                                !homeInfo ||
                                !homeInfo.config ||
                                (homeInfo && homeInfo.config && homeInfo.config.showQtdeCupons === true) ?
                                    <Grid item xs={12} sm={4}>
                                        <span className={globalClasses.cardTitle}>Quantidade de Cupons</span>

                                        <Grid container>
                                            <Grid item xs={6} className={classes.wrapperBlock}>
                                                <span className={globalClasses.cardTitleBold}>Cupons</span><br />

                                                <div className={globalClasses.primaryRoundedBlock}>
                                                    {
                                                        isLoading ?
                                                            '...'
                                                            :
                                                            homeInfo.data && homeInfo.data.cupom ? toFixed(homeInfo.data.cupom.totalCupons) : ' '
                                                    }
                                                </div>

                                                <br />
                                                <span className={globalClasses.cardTitleBold}>
                            {
                                isLoading ?
                                    <Skeleton width={87}/>
                                    :
                                    toMonetary(homeInfo.data && homeInfo.data.cupom ? homeInfo.data.cupom.valorTotalCupons : 0)
                            }
                          </span>
                                            </Grid>

                                            <Grid item xs={6} className={classes.wrapperBlock}>
                                                <span className={globalClasses.cardTitleBold}>Falta P/ Habilitar</span>
                                                <br />

                                                <span className={classes.cardTitleBoldLarge}>
                            {
                                isLoading ?
                                    <div style={{marginTop: -12}}>
                                        <Skeleton width={160} height={55}/>
                                    </div>
                                    :
                                    toMonetary(homeInfo.data && homeInfo.data.cupom ? homeInfo.data.cupom.faltaValorParaHabilitar : 0)
                            }
                          </span>
                                            </Grid>
                                        </Grid>

                                        {/*<div className={globalClasses.pointsTile}>
                                         <div className={globalClasses.pointsTileMedal}>
                                         <Medal />
                                         </div>

                                         <span>10 pontos</span>
                                         </div>*/}
                                    </Grid>
                                    :
                                    null
                            }

                            {
                                !homeInfo ||
                                !homeInfo.config ||
                                (homeInfo && homeInfo.config && homeInfo.config.showClassificacao === true) ?
                                    <Grid item xs={12} sm={8} className={classes.columnClassification}>
                                        <span className={globalClasses.cardTitle}>Classificação</span>

                                        <Grid container spacing={4}>
                                            <MiniCard
                                                className={globalClasses.miniCardStore}
                                                title={'Rank na Loja'}
                                                icon={<Store />}
                                                value={homeInfo.data && homeInfo.data.rankLoja ? homeInfo.data.rankLoja.rankUsuario : ' '}
                                                isLoading={isLoading}
                                            />

                                            <MiniCard
                                                className={globalClasses.miniCardRegion}
                                                title={'Rank na Região'}
                                                icon={<Map />}
                                                value={homeInfo.data && homeInfo.data.rankRegiao ? homeInfo.data.rankRegiao.rankUsuario : ' '}
                                                isLoading={isLoading}
                                            />

                                            <MiniCard
                                                className={globalClasses.miniCardWeb}
                                                title={'Rank na Rede'}
                                                icon={<Web />}
                                                value={homeInfo.data && homeInfo.data.rankRede ? homeInfo.data.rankRede.rankUsuario : ' '}
                                                isLoading={isLoading}
                                            />
                                        </Grid>
                                    </Grid>
                                    :
                                    null
                            }
                        </Grid>
                    </PaperCard>
                </Grid>
            </Grid>

            <PaperCard>
                <div className={classes.wrapperCard}>
                    <Grid container spacing={5}>
                        {
                            homeInfo.data &&
                            homeInfo.data.metasPorProduto &&
                            homeInfo.data.metasPorProduto ?
                                Object.keys(homeInfo.data.metasPorProduto).map((entry, index) => {
                                    const item = homeInfo.data.metasPorProduto[entry]

                                    return (
                                        <Grid item xs={6} sm={6} md key={index} className={classes.wrapperItem}>
                                            <div className={classes.cardTitleItem}>{item.descricao}</div>

                                            <ProgressBarItem
                                                percent={item.atingimento}
                                                realizado={item.realizado}
                                                orcado={item.orcado}
                                            />
                                        </Grid>
                                    )
                                })
                                :
                                null
                        }

                        {
                            isLoading ?
                                <>
                                <Grid item xs><Skeleton height={130}/></Grid>
                                <Grid item xs><Skeleton height={130}/></Grid>
                                <Grid item xs><Skeleton height={130}/></Grid>
                                <Grid item xs><Skeleton height={130}/></Grid>
                                </>
                                :
                                null
                        }
                    </Grid>
                </div>

                {
                    homeInfo.data ?
                        <>
                        <br/>
                        <span
                            className={classes.smallFont}>{`Última Atualização: ${homeInfo.data['dataUltAtualizacao']}`}</span>
                        </>
                        : null }
            </PaperCard>

            <Grid container spacing={5}>
                {
                    !homeInfo ||
                    !homeInfo.config ||
                    (homeInfo && homeInfo.config && homeInfo.config.showMelhoresLoja === true) ?
                        <Grid item xs={12} sm={6} md={4}>
                            <PaperCard>
                  <span className={globalClasses.cardTitle}>
                    {
                        isLoading ?
                            <Skeleton width="40%"/>
                            :
                            'Top 5 na Loja'
                    }
                  </span>

                                {
                                    isLoading ?
                                        <>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        </>
                                        :
                                        null
                                }

                                {
                                    homeInfo.data &&
                                    homeInfo.data.rankLoja &&
                                    homeInfo.data.rankLoja.melhorClassificados ?
                                        homeInfo.data.rankLoja.melhorClassificados.map((item, index) => {
                                            return (
                                                <UserPointItem
                                                    key={index}
                                                    index={index}
                                                    medalActive={index === 0}
                                                    username={item.nome}
                                                    points={item.cupons}
                                                />
                                            )
                                        })
                                        :
                                        null
                                }
                            </PaperCard>
                        </Grid>
                        :
                        null
                }

                {
                    !homeInfo ||
                    !homeInfo.config ||
                    (homeInfo && homeInfo.config && homeInfo.config.showMelhoresRegiao === true) ?
                        <Grid item xs={12} sm={6} md={4}>
                            <PaperCard>
                  <span className={globalClasses.cardTitle}>
                    {
                        isLoading ?
                            <Skeleton width="40%"/>
                            :
                            'Top 5 na Região'
                    }
                  </span>

                                {
                                    isLoading ?
                                        <>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        </>
                                        :
                                        null
                                }

                                {
                                    homeInfo.data &&
                                    homeInfo.data.rankRegiao &&
                                    homeInfo.data.rankRegiao.melhorClassificados ?
                                        homeInfo.data.rankRegiao.melhorClassificados.map((item, index) => {
                                            return (
                                                <UserPointItem
                                                    key={index}
                                                    index={index}
                                                    medalActive={index === 0}
                                                    username={item.nome}
                                                    points={item.cupons}
                                                />
                                            )
                                        })
                                        :
                                        null
                                }
                            </PaperCard>
                        </Grid>
                        :
                        null
                }

                {
                    !homeInfo ||
                    !homeInfo.config ||
                    (homeInfo && homeInfo.config && homeInfo.config.showMelhoresRede === true) ?
                        <Grid item xs={12} sm={6} md={4}>
                            <PaperCard>
                  <span className={globalClasses.cardTitle}>
                    {
                        isLoading ?
                            <Skeleton width="40%"/>
                            :
                            'Top 5 na Rede'
                    }
                  </span>

                                {
                                    isLoading ?
                                        <>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        <Skeleton height={87} className={classes.loadingWrapper}/>
                                        </>
                                        :
                                        null
                                }

                                {
                                    homeInfo.data &&
                                    homeInfo.data.rankRede &&
                                    homeInfo.data.rankRede.melhorClassificados ?
                                        homeInfo.data.rankRede.melhorClassificados.map((item, index) => {
                                            return (
                                                <UserPointItem
                                                    key={index}
                                                    index={index}
                                                    medalActive={index === 0}
                                                    username={item.nome}
                                                    points={item.cupons}
                                                />
                                            )
                                        })
                                        :
                                        null
                                }
                            </PaperCard>
                        </Grid>
                        :
                        null
                }
            </Grid>
        </Container>
        </>
    )
}

export default HomePage
