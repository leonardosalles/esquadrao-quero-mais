import {makeStyles} from '@material-ui/core/styles'

const homeStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    columnClassification: {
        padding: '0 70px',
        position: 'relative',

        '&:before': {
            content: '""',
            height: '98%',
            position: 'absolute',
            top: '1%',
            width: 1,
            backgroundColor: '#e5e5e5',
            left: 0
        }
    },
    wrapperBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 18
    },
    smallFont: {
        fontSize: 12,
        color: theme.palette.primary.accentStrongText,
    },
    loadingWrapper: {
        marginBottom: '-17px !important'
    },
    cardTitleBoldLarge: {
        color: theme.palette.primary.text,
        fontSize: 24,
        fontWeight: 500,
        paddingTop: 12
    },
    wrapperItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: theme.palette.primary.text
    },
    wrapperCard: {
        padding: '0 6%'
    },
    cardTitleItem: {
        textAlign: 'center',
        marginBottom: 24,
        color: theme.palette.primary.text,
        fontSize: 16,
    },
    '@media only screen and (max-width: 580px)': {
        columnClassification: {
            padding: 0,

            '&:before': {
                content: 'none'
            }
        },
        wrapperCard: {
            padding: '0'
        },
    }
}));

export default homeStyles