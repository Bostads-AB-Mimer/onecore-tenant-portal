import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'

const HomePage = () => (
  <div>
    <Typography variant="title">Välkommen!</Typography>
    <Typography variant="body1">
      Det här är mina sidor för ombyggnationen i området Gryta
    </Typography>
    <Card variant="outlined">
      <Typography variant="h2">
        <HomeWorkOutlinedIcon sx={{ marginRight: 0.5, marginLeft: 1.5 }} /> Mitt
        boende
      </Typography>
      <CardContent>
        <Typography variant="body2">
          Gravida egestas rhoncus nulla vehicula amet. Enim lacus auctor mauris
          faucibus eu blandit ut.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/mitt-boende">Läs mer...</Link>
      </CardActions>
    </Card>
  </div>
)
export default HomePage
