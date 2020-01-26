import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'

const LoadingPage = () => (
  <Container>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 70 }}>
      <CircularProgress />
      <span style={{ marginTop: 14, fontSize: 16, fontWeight: '500' }}>Carregando...</span>
    </div>
  </Container>
)

export default LoadingPage