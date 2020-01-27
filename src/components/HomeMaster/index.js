import React, { useState, useEffect } from 'react'

import SEO from '../../components/SEO'
import homeStyles from '../../styles/home-master'
import { Container, Grid, TextField, InputAdornment } from '@material-ui/core'
import globalStyles from '../../styles/global'
import PaperCard from '../../components/PaperCard'
import Skeleton from '@material-ui/lab/Skeleton'
import SearchIcon from '@material-ui/icons/Search'
import { isLoggedIn } from '../../services/auth'
import LogoEsquadraoGrey from '../Image/logo-esquadrao-grey'
import { getInfo } from '../../services/info'
import { navigate, Link } from 'gatsby'

const HomeMasterPage = ({info}) => {
  
  const globalClasses = globalStyles()
  const classes = homeStyles()

  const [isLoading, setIsLoading] = useState(true)
  const [homeInfo, setHomeInfo] = useState({})
  const [active, setActive] = useState('TUDO')
  const [searchText, setSearchText] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()

    const response = await getInfo({
      searchText,
      searchType: active
    })

    setHomeInfo({
      data: response.data
    })
  }

  const handleChange = event => {
    setSearchText(event.target.value)
  }

  const handleItemClick = item => {
    navigate('detalhe')
  }

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
                  <form onSubmit={handleSearch}>
                    <TextField
                      className={classes.searchInput}
                      placeholder="Digite um texto e pressione ENTER para iniciar a pesquisa..."
                      fullWidth
                      value={searchText}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon className={classes.sarchIcon} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </form>
                </Grid>

                <Grid item xs={12}>
                  <ul className={classes.list}>
                    <li>
                      <a
                        onClick={() => setActive('TUDO')}
                        className={active === 'TUDO' ? classes.activeItemList : ''}
                      >
                        Tudo
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => setActive('REGIAO')}
                        className={active === 'REGIAO' ? classes.activeItemList : ''}
                      >
                        Região
                      </a>
                    </li>

                    <li>
                      <a 
                        onClick={() => setActive('FILIAL')}
                        className={active === 'FILIAL' ? classes.activeItemList : ''}
                      >
                        Filial
                      </a>
                    </li>

                    <li>
                      <a
                        onClick={() => setActive('COLABORADOR')}
                        className={active === 'COLABORADOR' ? classes.activeItemList : ''}
                      >
                        Colaborador
                      </a>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </PaperCard>

            <div className={classes.wrapperList}>
              {
                homeInfo &&
                homeInfo.data &&
                homeInfo.data.map((item, index) => {
                  return (
                    <PaperCard key={index} spacing={0}>
                      <Link className={classes.itemLink} to={`/${item.entityId}/detalhe`}>
                        <h4 className={classes.title}>{item.titulo}</h4>
                        <p className={classes.subtitle}>{item.subtitulo}</p>
                        <p className={classes.detail}>{item.detalhe}</p>
                      </Link>
                    </PaperCard>
                  )
                })
              }

              {
                homeInfo &&
                !homeInfo.data ?
                  <div className={classes.imageInfo}>
                    <LogoEsquadraoGrey />
                  </div>
                :
                  null
              }
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default HomeMasterPage
