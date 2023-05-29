import { Stack, IconButton, MenuItem, Menu, Link } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu'

import mimerLogo from '../../assets/mimer-logo.png'

const SiteHeader = () => (
  <Stack sx={{ marginTop: 3, marginBottom: 1 }} direction='row' justifyContent='space-between' alignItems='center'>
    <img src={mimerLogo} width='160' />

    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
        <IconButton {...bindTrigger(popupState)}>
          <MenuIcon/>
        </IconButton>
        <Menu {...bindMenu(popupState)}>
          <MenuItem onClick={popupState.close}>
            <Link href='/'>
              Hem
            </Link>
          </MenuItem>
          <MenuItem onClick={popupState.close}>
            <Link href='/mitt-boende'>
              Mitt boende
            </Link>
          </MenuItem>
        </Menu>
        </>
      )}
    </PopupState>
  </Stack>
)

export default SiteHeader