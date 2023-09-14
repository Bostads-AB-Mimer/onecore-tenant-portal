import {
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { useEffect } from 'react'

import { useMaterialChoices } from './hooks/useMaterialOptions'
import {
  MaterialOptionGroup,
  RoomType,
  MaterialOption,
} from '../../common/types'
import Carousel from '../../components/Carousel'

const MaterialChoices = () => {
  const { data, isLoading } = useMaterialChoices()
  const roomTypes = data?.data.roomTypes

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Box>
        <Typography variant="h1">Beställda materialval</Typography>

        {roomTypes == null && !isLoading ? (
          <Typography variant="body1">
            Du har ännu inte genomfört några val
          </Typography>
        ) : (
          <Typography variant="body1">
            Här är materialvalen för ditt boende
          </Typography>
        )}
        {roomTypes?.map((roomType: RoomType, i) => (
          <Box key={i}>
            <Divider />
            <Typography variant="h2">{roomType.name}</Typography>
            {roomType.materialOptionGroups
              ?.filter(
                (group) => group.type == 'Concept' && group.materialChoices
              )
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i}>
                  <Typography variant="body1">
                    {materialOptionGroup.name}
                  </Typography>
                  <Carousel
                    links={materialOptionGroup.materialOptions?.map(
                      (materialOption: MaterialOption) => {
                        return {
                          link:
                            '/materialval/detaljer/' +
                            roomType.roomTypeId +
                            '/' +
                            materialOptionGroup.materialOptionGroupId +
                            '/' +
                            materialOption?.materialOptionId,
                          image: materialOption?.coverImage
                            ? '/api/material-options/assets/' +
                              materialOption?.coverImage
                            : undefined,
                          caption: materialOption?.caption,
                        }
                      }
                    )}
                  ></Carousel>
                  {materialOptionGroup.materialOptions?.map(
                    (materialOption: MaterialOption, i: number) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox disabled={true} checked={true} />}
                        label={materialOption?.caption}
                      ></FormControlLabel>
                    )
                  )}
                </Box>
              ))}
            {roomType.materialOptionGroups
              ?.filter((group) => group.type == 'SingleChoice')
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {materialOptionGroup.materialOptions?.map(
                      (materialOption: MaterialOption, i) => (
                        <Box key={i}>
                          <FormControlLabel
                            control={<Radio checked={true} disabled={true} />}
                            label={materialOption?.caption}
                            value={materialOption?.materialOptionId}
                          ></FormControlLabel>
                          {materialOption?.shortDescription}
                        </Box>
                      )
                    )}
                  </RadioGroup>
                </Box>
              ))}
            {roomType.materialOptionGroups
              ?.filter((group) => group.type == 'AddOn')
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i}>
                  <Typography variant="body1">
                    {materialOptionGroup.actionName}
                  </Typography>
                  {materialOptionGroup.materialOptions?.map(
                    (materialOption: MaterialOption, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox checked={true} disabled={true} />}
                        label={
                          materialOption?.caption +
                          ' ' +
                          materialOption?.shortDescription
                        }
                      ></FormControlLabel>
                    )
                  )}
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default MaterialChoices
