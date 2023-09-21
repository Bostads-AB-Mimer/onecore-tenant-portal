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

        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {roomTypes == null && !isLoading
            ? 'Du har ännu inte genomfört några val'
            : 'Här är materialvalen för ditt boende'}
        </Typography>
        {roomTypes?.map((roomType: RoomType, i) => (
          <Box key={i}>
            <Divider />
            <Typography variant="h2">{roomType.name}</Typography>
            {roomType.materialOptionGroups
              ?.filter(
                (group) => group.type == 'Concept' && group.materialChoices
              )
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i} sx={styles.groupBox}>
                  {materialOptionGroup.name && (
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                      {materialOptionGroup.name}
                    </Typography>
                  )}
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
                      <Box key={i} sx={styles.optionBox}>
                        <FormControlLabel
                          key={i}
                          control={<Checkbox disabled={true} checked={true} />}
                          label={materialOption?.caption}
                          sx={styles.labelDisabled}
                        ></FormControlLabel>
                      </Box>
                    )
                  )}
                </Box>
              ))}
            {roomType.materialOptionGroups
              ?.filter((group) => group.type == 'SingleChoice')
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i} sx={styles.groupBox}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {materialOptionGroup.materialOptions?.map(
                      (materialOption: MaterialOption, i) => (
                        <Box key={i} sx={styles.optionBox}>
                          <FormControlLabel
                            control={<Radio checked={true} disabled={true} />}
                            label={materialOption?.caption}
                            value={materialOption?.materialOptionId}
                            sx={styles.labelDisabled}
                          ></FormControlLabel>
                          <Typography
                            variant="body2"
                            sx={styles.shortDesc.singleChoice}
                          >
                            {materialOption.shortDescription}
                          </Typography>
                        </Box>
                      )
                    )}
                  </RadioGroup>
                </Box>
              ))}
            {roomType.materialOptionGroups
              ?.filter((group) => group.type == 'AddOn')
              .map((materialOptionGroup: MaterialOptionGroup, i) => (
                <Box key={i} sx={styles.groupBox}>
                  <Typography variant="body1">
                    {materialOptionGroup.actionName}
                  </Typography>
                  {materialOptionGroup.materialOptions?.map(
                    (materialOption: MaterialOption, i) => (
                      <Box key={i} sx={styles.optionBox}>
                        <FormControlLabel
                          key={i}
                          control={<Checkbox checked={true} disabled={true} />}
                          label={materialOption?.caption}
                          sx={styles.labelDisabled}
                        ></FormControlLabel>
                        <Typography variant="body2" sx={styles.shortDesc.addOn}>
                          {materialOption.shortDescription}
                        </Typography>
                      </Box>
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

const styles = {
  groupBox: {
    marginTop: 1,
    marginBottom: 1,
  },
  optionBox: {
    marginLeft: 2,
  },
  shortDesc: {
    singleChoice: {
      paddingLeft: 4,
      marginTop: -1,
    },
    addOn: {
      display: 'inline-block',
      paddingBottom: 1.25,
      verticalAlign: 'bottom',
    },
  },
  labelDisabled: {
    '& .MuiFormControlLabel-label.Mui-disabled': {
      WebkitTextFillColor: '#000000',
    },
  },
}

export default MaterialChoices
