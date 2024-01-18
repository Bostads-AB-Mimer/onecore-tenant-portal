import {
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import { MoonLoader } from 'react-spinners'

import materialChoiceCover from '../../assets/images/Materialval.png'
import Carousel from '../components/Carousel'
import { useLease } from './Lease/hooks/useLease'
import { useContact } from './Details/hooks/useContact'

const HomePage = () => {
  const { data } = useLease()
  const { isLoading: isLoadingContact, data: contactData } = useContact()

  const lease = data?.data
  const contact = contactData?.data

  const navigate = useNavigate()

  return (
    <div>
      {isLoadingContact && (
        <MoonLoader size="40px" style={{ margin: '40px auto' }}></MoonLoader>
      )}
      {contact && (
        <>
          <Typography variant="title">
            Välkommen {contact?.firstName}!
          </Typography>
          <Typography variant="body1">
            Det här är mina sidor för ombyggnationen i området Gryta
          </Typography>

          <Typography variant="h2">Aktuellt</Typography>

          <Carousel
            links={[{ link: '/materialval', image: materialChoiceCover }]}
          ></Carousel>

          <Card variant="outlined">
            <ButtonBase
              onClick={() => {
                navigate('/mitt-boende')
              }}
              sx={styles.buttonBase}
            >
              <Typography variant="h2">
                <HomeWorkOutlinedIcon
                  sx={{ marginRight: 0.5, marginLeft: 1.5 }}
                />{' '}
                Mitt boende
              </Typography>
              <CardContent>
                <Typography variant="body2">
                  {lease?.leaseId}
                  <br />
                  {lease?.rentalProperty?.address?.street +
                    ' ' +
                    lease?.rentalProperty?.address?.number}
                </Typography>
              </CardContent>
              <CardActions sx={styles.cardAction}>
                <Link to="/mitt-boende">Läs mer...</Link>
              </CardActions>
            </ButtonBase>
          </Card>
        </>
      )}
    </div>
  )
}

const styles = {
  buttonBase: {
    display: 'block',
    textAlign: 'initial',
    width: '100%',
  },
  cardAction: {
    textAlign: 'right',
  },
}

export default HomePage
