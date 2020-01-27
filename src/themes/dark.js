import {createMuiTheme} from '@material-ui/core/styles'

const palette = {
    primary: {
        light: '#09a267',
        main: '#037649',
        contrastText: '#ffffff',
        text: '#c2c2c2',
        background: '#303030',
        cardBackground: '#191919',
        progressBackground: '#727272',
        strongText: 'darkgrey',
        accentStrongText: '#727272',
        accentBackground: '#303030',
        accentText: '#587ec5',
        tableHeader: {
            background: '#181818',
            color: '#3d7344'
        },
        tableSubheader: {
            background: '#303030',
            color: '#309e26'
        },
        table: {
            oddColor: '#e2e2e2',
            evenColor: '#939393'
        },
        pill: {
            background: '#727272'
        },
        searchPill: {
            background: '#3c424c'
        },
        searchInput: {
            color: '#ffffff'
        }
    },
    secondary: {
        light: '#ec5357',
        main: '#284437',
        contrastText: '#ffffff'
    },
    text: {
        main: '#5d5d5d'
    },
    accent: {
        main: '#00953e'
    },
    success: {
        main: '#4caf50'
    },
    info: {
        main: '#2196f3'
    },
    warning: {
        main: '#ff9800'
    },
    error: {
        main: '#ff7c73'
    }
}

const theme = createMuiTheme({
    palette
})

export default theme