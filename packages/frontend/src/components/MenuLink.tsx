import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
const MenuLink = ({ href, title }: { href: string; title: string }) => (
  <Link to={href} style={styles.link}>
    <Box sx={styles.text}>{title}</Box>
  </Link>
)
const styles = {
  link: {
    width: '100%',
  },
  text: {
    fontSize: 14,
    fontFamily: 'graphikRegular',
    color: '#000',
  },
}
export default MenuLink
