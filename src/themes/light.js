import {createMuiTheme} from '@material-ui/core/styles'

const palette = {
    primary: {
        light: '#09a267',
        main: '#037649',
        contrastText: '#ffffff',
        text: '#797979',
        background: '#f7f7f7',
        cardBackground: '#fff',
        progressBackground: '#dedede',
        strongText: '#757474',
        accentStrongText: '#757474',
        accentBackground: 'transparent',
        accentText: '#0e4bbb',
        tableHeader: {
            background: '#e2eed9',
            color: ''
        },
        tableSubheader: {
            background: '#a9d08f',
        },
        table: {
            oddColor: '#e2e2e2',
            evenColor: '#fff'
        },
        pill: {
            background: '#c2c2c2'
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
        main: '#c24131'
    }
}

const theme = createMuiTheme({
    palette
})

export default theme