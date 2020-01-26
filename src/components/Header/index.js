import PropTypes from 'prop-types'
import React from 'react'
import { Link, navigate } from 'gatsby'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import LogoDesktop from '../Image/logo'
import LogoMobile from '../Image/logo-mobile'
import { Container, Grid, IconButton, Button, Menu, MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import headerStyles from '../../styles/header'
import { logout, getUser } from '../../services/auth'
import LogoEsquadraoMini from '../Image/logo-esquadrao-mini'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { esquadraoContext } from '../../provider'
import Profile from '../Profile'

const Header = () => {
  const classes = headerStyles()
  const user = getUser()

  const [isOpenMenu, setIsOpenMenu] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = isOpen => () => {
    setIsOpenMenu(isOpen)
  }

  const [hovered, setHovered] = React.useState()
  const toggleHover = (index) => () => {
    setHovered(index)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout(() => {
      navigate('/login')
    })
  }

  const getMenuItems = (className) => (
    <ul className={className}>
      <li>
        <Link
          to="/"
          onMouseEnter={toggleHover(0)}
          onMouseLeave={toggleHover(null)}
          className={hovered === 0 ? 'active' : ''}
        >
          Início
        </Link>
      </li>
    </ul>
  )

  return (
    <esquadraoContext.Consumer>
      {context => (
        <div className={classes.root}>
          <AppBar
            position="fixed"
            elevation={3}
            className={classes.appBar}
          >
            <Toolbar>
              <Container>
                <Grid
                  justify="space-between"
                  container 
                >
                  <Grid item className={classes.root}>
                    <IconButton aria-label="Abrir Menu" onClick={toggleDrawer(true)} className={classes.mobileToggle}>
                      <MenuIcon />
                    </IconButton>
    
                    <div className={classes.logoMobile}>
                      <Link to="/">
                        <LogoMobile /> <LogoEsquadraoMini />
                      </Link>
                    </div>
    
                    <div className={classes.logoDesktop}>
                      <Link to="/">
                        <LogoDesktop /> <LogoEsquadraoMini />
                      </Link>
                    </div>
    
                    <div className={classes.headerRight}>
                      <Button aria-controls="user-menu" aria-haspopup="true" onClick={() => context.changeTheme()} className={classes.userButton}>
                        {
                          context.isDark ?
                            <BrightnessHighIcon />
                          :
                            <Brightness4Icon />
                        }
                      </Button>
    
                      <Button aria-controls="user-menu" aria-haspopup="true" onClick={handleClick} className={classes.userButton}>
                        Olá, {user.nome} <span className={classes.arrowDown}></span>
                      </Button>
    
                      <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className={classes.userDropdown}
                      >
                        <MenuItem onClick={() => { setOpen(true);handleClose() }}>Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                      </Menu>
                    </div>
                  </Grid>
                </Grid>
              </Container>
            </Toolbar>
          </AppBar>
    
          <Drawer anchor="left" open={isOpenMenu} onClose={toggleDrawer(false)}>
            <div className={classes.menuHeader}></div>
            {getMenuItems(classes.listMenuMobile)}
          </Drawer>

          <Profile
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </esquadraoContext.Consumer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header