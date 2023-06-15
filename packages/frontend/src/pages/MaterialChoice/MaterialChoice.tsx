import {
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { useState } from 'react'

import { useMaterialOptions } from './hooks/useMaterialOptions'
import {
  MaterialOptionGroup,
  MaterialOption,
  RoomType,
} from '../../common/types'
import DropDown from '../../components/DropDown'
import Carousel from '../../components/Carousel'

const MaterialChoice = () => {
  const [conceptChoices, setConceptChoices] = useState(
    Array<{ materialOptionId: string; materialOptionGroupId: string }>
  )

  const { data } = useMaterialOptions({ apartmentId: '123' })
  const roomTypes = data?.data?.roomTypes

  const defaultValue = '0'

  return (
    <>
      <Box>
        <Typography variant="h1">Dags för materialval</Typography>
        <Typography variant="body1">
          Det har nu blivit dags att göra materialval för ditt kommande boende!
        </Typography>
        <Divider />
        {conceptChoices &&
          roomTypes?.map((roomType: RoomType, i) => (
            <Box key={i}>
              <Typography variant="h2">{roomType.name}</Typography>
              {roomType.materialOptionGroups
                ?.filter((group) => group.type == 'Concept')
                .map((materialOptionGroup: MaterialOptionGroup, i) => (
                  <Box key={i}>
                    <Typography variant="body1">
                      {materialOptionGroup.name}
                    </Typography>
                    <Carousel
                      links={materialOptionGroup.materialOptions?.map(
                        (materialOption: MaterialOption) => {
                          return {
                            link: '/materialval',
                            image: materialOption.coverImage,
                            caption: materialOption.caption,
                          }
                        }
                      )}
                    ></Carousel>
                    {materialOptionGroup.materialOptions &&
                      materialOptionGroup.materialOptions.length > 1 && (
                        <DropDown
                          id={
                            roomType.roomTypeId +
                            '_' +
                            materialOptionGroup.materialOptionGroupId +
                            '_concept'
                          }
                          label={
                            materialOptionGroup.actionName ?? 'Välj alternativ'
                          }
                          defaultValue={defaultValue}
                          options={
                            materialOptionGroup.materialOptions?.map(
                              (materialOption: MaterialOption) => {
                                return {
                                  value: materialOption.materialOptionId,
                                  label: materialOption.caption,
                                }
                              }
                            ) ?? []
                          }
                          onSelect={(value: string) => {
                            //create new array to remove any old choice
                            const newChoices =
                              conceptChoices.filter(
                                (choice) =>
                                  choice.materialOptionGroupId !=
                                  materialOptionGroup.materialOptionGroupId
                              ) ?? []

                            if (value != defaultValue) {
                              newChoices.push({
                                materialOptionId: value,
                                materialOptionGroupId:
                                  materialOptionGroup.materialOptionGroupId,
                              })
                            }

                            setConceptChoices(newChoices)
                          }}
                        />
                      )}
                  </Box>
                ))}
              {roomType.materialOptionGroups
                ?.filter((group) => group.type == 'SingleChoice')
                .map((materialOptionGroup: MaterialOptionGroup, i) => (
                  <Box key={i}>
                    <Typography variant="body1">
                      {materialOptionGroup.actionName}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {materialOptionGroup.materialOptions?.map(
                        (materialOption: MaterialOption, i) => (
                          <Box key={i}>
                            <FormControlLabel
                              control={<Radio />}
                              label={materialOption.caption}
                              value={materialOption.materialOptionId}
                            ></FormControlLabel>
                            {materialOption.shortDescription}
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
                          control={<Checkbox />}
                          label={
                            materialOption.caption +
                            ' ' +
                            materialOption.shortDescription
                          }
                        ></FormControlLabel>
                      )
                    )}
                  </Box>
                ))}
              <Divider />
            </Box>
          ))}
      </Box>
    </>
  )
}

export default MaterialChoice
