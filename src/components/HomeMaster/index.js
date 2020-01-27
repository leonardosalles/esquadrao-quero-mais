import React, { useState, useEffect } from 'react'

import SEO from '../../components/SEO'
import homeStyles from '../../styles/home-master'
import { Container, Grid, TextField, InputAdornment } from '@material-ui/core'
import globalStyles from '../../styles/global'
import PaperCard from '../../components/PaperCard'
import Skeleton from '@material-ui/lab/Skeleton'
import SearchIcon from '@material-ui/icons/Search'
import { isLoggedIn } from '../../services/auth'

const HomeMasterPage = ({info}) => {
  
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

  return(
    <>
      <SEO title="Início" />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaperCard>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.searchInput}
                    placeholder="Digite algo para pesquisar..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon style={{ color: '#fff' }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ul className={classes.list}>
                    <li><a href="">Tudo</a></li>
                    <li><a href="">Região</a></li>
                    <li><a href="">Filial</a></li>
                    <li><a href="">Colaborador</a></li>
                  </ul>
                </Grid>
              </Grid>
            </PaperCard>

            {
              homeInfo &&
              homeInfo.data &&
              homeInfo.data.map((item, index) => {
                return (
                  <PaperCard key={index}>
                    <h4 className={classes.title}>{item.titulo}</h4>
                    <p className={classes.subtitle}>{item.subtitulo}</p>
                    <p className={classes.detail}>{item.detalhe}</p>
                  </PaperCard>
                )
              })
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomeMasterPage
