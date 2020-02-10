import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import HomeRegionalPage from '../components/HomeRegional'
import HomeGerencialPage from '../components/HomeGerencial'
import DashRegioesPage from '../components/DashRegioes'
import HomePage from '../components/Home'
import {getUser} from '../services/auth'
import {navigate} from 'gatsby'
import {getInfoDetalhe, getDadosDashRegioes} from '../services/info'

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
    let page = null
    if (urlParams) {
        perspectiva = urlParams.get('perspectiva')
        page = urlParams.get('page')
    }

    useEffect(() => {
        const fetchData = async () => {

            if (perspectiva){
                const response = await getInfoDetalhe(props['*'], perspectiva)

                setHomeInfo({
                    data: response.data,
                    config: response.features
                })
            }else if (page === 'DASH_REGIOES'){
                const response = await getDadosDashRegioes()

                setHomeInfo({
                    data: response,
                })
            }
        }
        if (isMaster) {
            fetchData()
        }
    }, [])

    if (isMaster && page === 'DASH_REGIOES') {
        return (
            <Layout>
                <DashRegioesPage info={homeInfo}/>
            </Layout>
        )
    }

    if (isMaster && perspectiva === 'REGIONAL') {
        return (
            <Layout>
                <HomeRegionalPage info={homeInfo}/>
            </Layout>
        )
    }

    if (perspectiva === 'GERENCIAL') {
        return (
            <Layout>
                <HomeGerencialPage info={homeInfo}/>
            </Layout>
        )
    }

    if (perspectiva === 'OPERACIONAL') {
        return (
            <Layout>
                <HomePage info={homeInfo}/>
            </Layout>
        )
    }

    if (typeof window !== 'undefined') {
        navigate('/login')
    }

    return null
}

export default Detalhe