import {
  Box,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from '@mui/material'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'

import materialChoiceCover from '../../assets/images/Materialval.png'
import Carousel from '../components/Carousel'

const HomePage = () => {
  return (
    <div>
      <Typography variant="title">Välkommen!</Typography>
      <Typography variant="body1">
        Det här är mina sidor för ombyggnationen i området Gryta
      </Typography>

      <Typography variant="h2">Aktuellt</Typography>

      <Carousel
        links={[{ link: '/materialval', image: materialChoiceCover }]}
      ></Carousel>

      <Card variant="outlined">
        <Typography variant="h2">
          <HomeWorkOutlinedIcon sx={{ marginRight: 0.5, marginLeft: 1.5 }} />{' '}
          Mitt boende
        </Typography>
        <CardContent>
          <Typography variant="body2">
            Gravida egestas rhoncus nulla vehicula amet. Enim lacus auctor
            mauris faucibus eu blandit ut.
          </Typography>
        </CardContent>
        <CardActions>
          <Link href="/mitt-boende">Läs mer...</Link>
        </CardActions>
      </Card>
    </div>
  )
}
export default HomePage
