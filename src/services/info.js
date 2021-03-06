import { getUser, getUserToken } from './auth'

const getHomePage = key => {
  let page = 'home';

  if (key === 'GERENCIAL') {
    page = 'homeGerencial'
  }

  if (key === 'REGIONAL') {
    page = 'homeRegional'
  }

  if (key === 'MASTER') {
    page = 'homeMaster'
  }

  return page
}

export const getInfo = async (data) => {
  const user = getUser()
  const userToken = getUserToken()

  let body = {
    userId: user.userId,
    page: getHomePage(user.perspectiva)
  };

  if (data) {
    body = Object.assign(body, data)
  }

  const response = await fetch(`${process.env.MSB_URL}/esquadraoQueroMais/v1/findDadosHome`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-token': userToken
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

export const getInfoDetalhe = async (entityId, perspectiva) => {
  const user = getUser()
  const userToken = getUserToken()

  let body = {
    userId: user.userId,
    page: getHomePage(user.perspectiva)
  };

  const response = await fetch(`${process.env.MSB_URL}/esquadraoQueroMais/v1/findDetalhe?perspectiva=${perspectiva}&id=${entityId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-token': userToken
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

export const getDadosDashRegioes = async () => {
    const userToken = getUserToken()

    const response = await fetch(`${process.env.MSB_URL}/esquadraoQueroMais/v1/getDadosDashRegioes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api-token': userToken
        }
    });
    return await response.json();
}