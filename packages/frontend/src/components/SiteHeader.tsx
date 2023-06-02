import {
  Stack,
  IconButton,
  MenuItem,
  Menu,
  Link,
  Typography,
  Divider,
  Backdrop,
} from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import mimerLogo from '../../assets/mimer-logo.png'
import MenuLink from './MenuLink'

const SiteHeader = () => (
  <Stack
    sx={{ marginTop: 2, marginBottom: 1 }}
    direction="row"
    justifyContent="space-between"
    alignItems="center"
  >
    <img src={mimerLogo} width="160" />

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} sx={{ padding: 0 }}>
            <MenuIcon />
          </IconButton>
          <Backdrop open={popupState.isOpen} onClick={popupState.close}>
            <Menu
              {...bindMenu(popupState)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              elevation={0}
              sx={{ top: -16, left: 20 }}
            >
              <IconButton
                onClick={popupState.close}
                sx={{ position: 'absolute', top: 5, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="hMenu">Aktuellt</Typography>
              <MenuItem onClick={popupState.close} sx={styles.menuItem}>
                <MenuLink href="/" title="Dags för materialval" />
              </MenuItem>
              <Divider
                sx={{
                  marginLeft: 2,
                  marginRight: 3,
                  paddingTop: 0,
                }}
              />
              <MenuItem onClick={popupState.close} sx={styles.menuItem}>
                <MenuLink href="/" title="Hem" />
              </MenuItem>
              <MenuItem onClick={popupState.close} sx={styles.menuItem}>
                <MenuLink href="/mitt-boende" title="Mitt boende" />
              </MenuItem>
            </Menu>
          </Backdrop>
        </>
      )}
    </PopupState>
  </Stack>
)

const styles = {
  menuItem: {
    minHeight: 20,
    marginRight: 20,
  },
}

export default SiteHeader
