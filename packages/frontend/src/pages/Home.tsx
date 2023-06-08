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

const HomePage = () => (
  <div>
    <Typography variant="title">Välkommen!</Typography>
    <Typography variant="body1">
      Det här är mina sidor för ombyggnationen i området Gryta
    </Typography>

    <Typography variant="h2">Aktuellt</Typography>

    <Box
      sx={{
        marginTop: 1,
        marginBottom: 2,
      }}
    >
      <Link href="/materialval">
        <img src={materialChoiceCover} />
      </Link>
    </Box>

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
        <Link href="/mitt-boende">Läs mer...</Link>
      </CardActions>
    </Card>
  </div>
)
export default HomePage
