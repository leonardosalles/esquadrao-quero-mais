import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import HomePage from '../components/Home'
import Layout from '../components/Layout'
import { getInfo } from '../services/info'
import { getUser } from '../services/auth'
import HomeGerencialPage from '../components/HomeGerencial'
import HomeRegionalPage from '../components/HomeRegional'

const IndexPage = () => {
  const [homeInfo, setHomeInfo] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInfo()

      setHomeInfo({
        data: response.data,
        config: response.features
      })
    }

    fetchData()
  }, [])

  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.sessionToken`)
    const userInfo = getUser()

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

    navigate('/login')
  }

  return null
}

export default IndexPage