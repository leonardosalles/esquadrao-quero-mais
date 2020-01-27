import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import HomePage from '../components/Home'
import Layout from '../components/Layout'
import { getInfo } from '../services/info'
import { getUser } from '../services/auth'
import HomeGerencialPage from '../components/HomeGerencial'
import HomeRegionalPage from '../components/HomeRegional'
import HomeMasterPage from '../components/HomeMaster'

const IndexPage = () => {
  const [homeInfo, setHomeInfo] = useState({})

  const token = typeof window !== 'undefined' ? window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.sessionToken`) : null
  const userInfo = getUser()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfo()

      setHomeInfo({
        data: response.data,
        config: response.features
      })
    }

    if (token && userInfo.perspectiva !== 'MASTER') {
      fetchData()
    }
  }, [])

  if (token && userInfo.perspectiva === 'OPERACIONAL') {
    return (
      <Layout>
        <HomePage info={homeInfo} />
      </Layout>
    )
  }

  if (token && userInfo.perspectiva === 'GERENCIAL') {
    return (
      <Layout>
        <HomeGerencialPage info={homeInfo} />
      </Layout>
    )
  }

  if (token && userInfo.perspectiva === 'REGIONAL') {
    return (
      <Layout>
        <HomeRegionalPage info={homeInfo} />
      </Layout>
    )
  }

  if (token && userInfo.perspectiva === 'MASTER') {
    return (
      <Layout>
        <HomeMasterPage info={homeInfo} />
      </Layout>
    )
  }

  navigate('/login')
  return null
}

export default IndexPage