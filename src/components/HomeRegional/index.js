import React, { useState, useEffect } from 'react'

import SEO from '../../components/SEO'
import homeRegionalStyles from '../../styles/home-regional'
import { Container, Grid } from '@material-ui/core'
import { isLoggedIn } from '../../services/auth'
import globalStyles from '../../styles/global'
import { toMonetary, toSignalColor } from '../../services/utils'
import LoadingPage from './loading-page'
import PaperCard from '../../components/PaperCard'
import UserPointItem from '../../components/UserPointItem'

const SubheaderItem = () => {
  const classes = homeRegionalStyles()

  return (
    <>
      <Grid item xs={5} className={classes.insetTextItem}>
        <span className={classes.insetText}>META ACUM.</span>
      </Grid>

      <Grid item xs={5} className={classes.insetTextItem}>
        <span className={classes.insetText}>REAL</span>
      </Grid>

      <Grid item xs={2} className={classes.insetTextItem}>
        <span className={classes.insetText}>%ATING.</span>
      </Grid>
    </>
  )
}

const StatusCircle = ({percent}) => {
  const globalClasses = globalStyles()

  const getCircleColor = () => {
    return toSignalColor(percent, globalClasses.warningCircle, globalClasses.dangerCircle, globalClasses.successCircle)
  }

  return (
    <div className={getCircleColor()}></div>
  )
}

const ListItem = ({data}) => {
  const classes = homeRegionalStyles()

  return (
    <>
      <Grid item xs={5} className={classes.insetItemValue}>
        {toMonetary(data.metaAcumulada)}
      </Grid>

      <Grid item xs={5} className={classes.insetItemValueCentered}>
        {toMonetary(data.realizado)} <StatusCircle percent={data.percAtingimento} />
      </Grid>

      <Grid item xs={2} className={classes.insetItemValue}>
        {data.percAtingimento}%
      </Grid>
    </>
  )
}

const HomeRegionalPage = ({info}) => {
  
  const classes = homeRegionalStyles()
  const globalClasses = globalStyles()

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

  if ((!isLoggedIn() && typeof window !== 'undefined')) {
    return null
  }

  return(
    <>
      <SEO title="Início" />
      
      <div className={classes.rootMobile}>
        <Container maxWidth="xl" className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Grid item xs={12} className={classes.parentHeader}>
                <Grid container className={classes.header}>
                  <Grid item xs={1} className={classes.headerInsetItem}></Grid>
                  <Grid item xs={1} className={classes.headerInsetItem}>CLASSIFICAÇÃO</Grid>

                  {
                    homeInfo.data.lojas.tabelaDeIndicadores &&
                    Object.keys(homeInfo.data.lojas.tabelaDeIndicadores).map((key, index) => {
                      return (<Grid item xs className={classes.headerInsetItem} key={index}>{homeInfo.data.lojas.tabelaDeIndicadores[key]}</Grid>)
                    })
                  }
                </Grid>

                <Grid container className={classes.subheader}>
                  <Grid item xs={1} className={classes.subheaderInsetItem}>
                    LOJA
                  </Grid>

                  <Grid item xs={1} className={classes.subheaderInsetItem}>
                    <Grid container spacing={2}>
                      <Grid item xs className={classes.insetTextItem}>
                        <span className={classes.insetTextCenter}>REDE</span>
                      </Grid>

                      <Grid item xs className={classes.insetTextItem}>
                        <span className={classes.insetTextCenter}>REGIÃO</span>
                      </Grid>
                    </Grid>
                  </Grid>

                  {
                    homeInfo.data.lojas.tabelaDeIndicadores &&
                    Object.keys(homeInfo.data.lojas.tabelaDeIndicadores).map((item, index) => {
                      return (
                        <Grid item xs className={classes.subheaderInsetItem} key={index}>
                          <SubheaderItem />
                        </Grid>)
                    })
                  }
                </Grid>
              </Grid>

              {
                homeInfo.data &&
                homeInfo.data.lojas &&
                homeInfo.data.lojas.indicadores &&
                homeInfo.data.lojas.indicadores.map((indicador, index) => {

                  return (
                    <Grid container className={classes.item} key={index}>
                      <Grid item xs={1} className={classes.insetItemValueFirst}>
                        {indicador.nomeLoja}
                      </Grid>

                      <Grid item xs={1} className={classes.insetItem}>
                        <Grid container spacing={2}>
                          <Grid item xs className={classes.insetItemValueCenter}>
                            {indicador.rankRede}
                          </Grid>

                          <Grid item xs className={classes.insetItemValueCenter}>
                            {indicador.rankRegiao}
                          </Grid>
                        </Grid>
                      </Grid>

                      {
                        homeInfo.data.lojas.tabelaDeIndicadores &&
                        Object.keys(homeInfo.data.lojas.tabelaDeIndicadores).map((key, index) => {
                          const item = indicador[key]

                          return (
                              <Grid item xs className={classes.insetItem} key={index}>
                                <Grid container spacing={2}>
                                  <ListItem data={item} />
                                </Grid>
                              </Grid>
                          )
                        })
                      }
                    </Grid>
                  )
                })
              }

              <Grid container className={classes.subheader}>
                <Grid item xs={1} className={classes.subheaderInsetItem}></Grid>
                <Grid item xs={1} className={classes.subheaderInsetItem}></Grid>

                {
                  homeInfo.data.lojas.tabelaDeIndicadores &&
                  Object.keys(homeInfo.data.lojas.tabelaDeIndicadores).map((item, index) => {
                    return (<Grid item xs className={classes.subheaderInsetItem} key={index}></Grid>)
                  })
                }
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <div className={classes.normalizedCard}>
                <PaperCard>
                  <span className={globalClasses.cardTitle}>Top 5 na Rede</span>
                  
                  {
                    homeInfo.data &&
                    homeInfo.data.lojas &&
                    homeInfo.data.lojas.regioesMaisClassificadas ?
                      homeInfo.data.lojas.regioesMaisClassificadas.map((item, index) => {
                        return (
                          <UserPointItem
                            key={index}
                            index={index}
                            medal={false}
                            height={55}
                            username={item.nomeRegiao}
                          />
                        )
                      })
                    :
                      null
                  }
                </PaperCard>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default HomeRegionalPage
