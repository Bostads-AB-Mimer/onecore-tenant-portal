import { Link, Typography } from '@mui/material'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useMaterialOptionDetails } from './hooks/useMaterialOptions'

const MaterialChoiceDetails = () => {
  const { roomTypeId, materialOptionGroupId, materialOptionId } = useParams()
  const navigate = useNavigate()
  //const [materialOption, setMaterialOption] = useState({} as MaterialOption)

  let materialOption

  if (roomTypeId && materialOptionGroupId && materialOptionId) {
    materialOption = useMaterialOptionDetails({
      roomTypeId,
      materialOptionGroupId,
      materialOptionId,
    })?.data?.data.materialOption
  }

  return (
    <>
      <Link onClick={() => navigate(-1)}>&lt; Materialval</Link>
      <Typography variant="h2">{materialOption?.roomTypeName}</Typography>
      <Typography variant="h1">{materialOption?.caption}</Typography>
      <Typography variant="body1">
        RoomTypeId: {roomTypeId}
        <br />
        MaterialOptionGroupId: {materialOptionGroupId}
        <br />
        MaterialOptionId: {materialOptionId}
      </Typography>
    </>
  )
}

export default MaterialChoiceDetails
