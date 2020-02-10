import {makeStyles} from '@material-ui/core/styles'

const headerStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    arrowDown: {
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid #fff',
        marginLeft: 4
    },
    headerRight: {
        position: 'absolute',
        right: 0,
    },
    dashboardIcon: {
        color: '#fff',
    },
    userButton: {
        color: '#fff',
        textTransform: 'capitalize',
    },
    listMenu: {
        padding: 0,
        margin: 0,
        listStyle: 'none',

        '& li': {
            display: 'inline',
        },

        '& a': {
            padding: '2px 20px',
            display: 'inline-block',
            color: '#333',
            textDecoration: 'none',
            textTransform: 'uppercase',
            height: 85,
            fontSize: 15,
            lineHeight: '78px',
            position: 'relative',

            '&:before': {
                content: '""',
                position: 'absolute',
                zIndex: '-1',
                left: '51%',
                right: '51%',
                bottom: 5,
                background: theme.palette.primary.main,
                height: 3,
                transitionProperty: 'left,right',
                transitionDuration: '.3s',
                transitionTimingFunction: 'ease-out',
            },

            '&.active:before': {
                left: 0,
                right: 0
            }
        }
    },
    mobileToggle: {
        display: 'none'
    },
    logoMobile: {
        display: 'none'
    },
    userDropdown: {
        marginTop: 38,

        '& div:nth-child(3)': {
            minWidth: 133,
            marginLeft: 17
        }
    },
    logoDesktop: {
        '& .gatsby-image-wrapper:first-child': {
            marginRight: 15
        }
    },
    '@media only screen and (max-width: 580px)': {
        listMenu: {
            display: 'none'
        },
        appBar: {
            '& div:nth-child(1)': {
                paddingLeft: 1,
                paddingRight: 3
            }
        },
        mobileToggle: {
            display: 'block',
            color: '#fff'
        },
        listMenuMobile: {
            padding: 0,
            margin: 0,
            listStyle: 'none',
            minWidth: 255,

            '& a': {
                display: 'flex',
                height: 40,
                alignItems: 'center',
                paddingLeft: 12,
                color: '#333',
                fontSize: '1rem',
                borderBottom: '0.55px solid #e3e3e3'
            }
        },
        menuHeader: {
            height: 56,
            background: theme.palette.primary.main
        },
        logoMobile: {
            display: 'block',

            '& .gatsby-image-wrapper:first-child': {
                display: 'none !important'
            }
        },
        logoDesktop: {
            display: 'none'
        },
        userDropdown: {
            '& div:nth-child(3)': {
                marginLeft: 0
            }
        },
    }
}))

export default headerStyles