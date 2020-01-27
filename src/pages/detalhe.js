import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import HomeRegionalPage from '../components/HomeRegional'
import HomeGerencialPage from '../components/HomeGerencial'
import HomePage from '../components/Home'
import { getUser } from '../services/auth'
import { navigate } from 'gatsby'
import { getInfoDetalhe } from '../services/info'

const Detalhe = (props) => {
  const [homeInfo, setHomeInfo] = useState({})

  const token = typeof window !== 'undefined' ? window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.sessionToken`) : null
  const userInfo = getUser()
  const isMaster = token && userInfo.perspectiva === 'MASTER'

  let urlParams = null

  if (typeof window !== 'undefined') {
    urlParams = new URLSearchParams(window.location.search)
  }

  let perspectiva = null
  if (urlParams) {
    perspectiva = urlParams.get('perspectiva')
  }


  useEffect(() => {
    const fetchData = async () => {
      
      const response = await getInfoDetalhe(props['*'], perspectiva)

      setHomeInfo({
        data: response.data,
        config: response.features
      })
    }

    if (isMaster) {
      fetchData()
    }
  }, [])

  if (isMaster && perspectiva === 'REGIONAL') {
    return (
      <Layout>
        <HomeRegionalPage info={homeInfo} />
      </Layout>
    )
  }

  if (perspectiva === 'GERENCIAL') {
    return (
      <Layout>
        <HomeGerencialPage info={homeInfo} />
      </Layout>
    )
  }

  if (perspectiva === 'OPERACIONAL') {
    return (
      <Layout>
        <HomePage info={homeInfo} />
      </Layout>
    )
  }

  if (typeof window !== 'undefined') {
    navigate('/login')
  }

  return null
}

export default Detalhe