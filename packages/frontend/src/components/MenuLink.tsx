import { Link } from '@mui/material'
const MenuLink = ({ href, title }: { href: string; title: string }) => (
  <Link
    sx={{ fontSize: 14, fontFamily: 'graphikRegular', color: '#000' }}
    href={href}
  >
    {title}
  </Link>
)
export default MenuLink
