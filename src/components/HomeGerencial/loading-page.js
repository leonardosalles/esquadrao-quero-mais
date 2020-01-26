import React from 'react'
import PaperCard from '../PaperCard'
import { Grid, Container } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const LoadingPage = () => (
  <Container>
    <PaperCard>
      <Grid container>
        <Grid item xs={1}>
          <Skeleton height={50} />
        </Grid>

        <Grid item xs={2}>
          <Skeleton width="70%" height={50} style={{marginLeft: 10}} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
        </Grid>
      </Grid>
    </PaperCard>

    <PaperCard>
      <Grid container>
        <Grid item xs={12}>
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
        </Grid>
      </Grid>
    </PaperCard>
  </Container>
)

export default LoadingPage