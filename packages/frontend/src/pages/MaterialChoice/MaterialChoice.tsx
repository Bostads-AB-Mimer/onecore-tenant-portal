import {
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'

import { useMaterialOptions } from './hooks/useMaterialOptions'
import {
  MaterialOptionGroup,
  MaterialOption,
  MaterialChoice,
  RoomType,
} from '../../common/types'
import { useState } from 'react'
import DropDown from '../../components/DropDown'

const Lease = () => {
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
          roomTypes?.map((roomType: RoomType) => (
            <>
              <Typography variant="h2">{roomType.name}</Typography>
              {roomType.materialOptionGroups
                ?.filter((group) => group.type == 'Concept')
                .map((materialOptionGroup: MaterialOptionGroup) => (
                  <>
                    <Typography variant="body1">
                      {materialOptionGroup.name}
                    </Typography>
                    {materialOptionGroup.materialOptions?.map(
                      (materialOption: MaterialOption) => (
                        <>
                          <img src={materialOption.coverImage} width="75%" />
                          <Typography variant="body1">
                            {materialOption.caption}
                          </Typography>
                        </>
                      )
                    )}
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
                  </>
                ))}
              {roomType.materialOptionGroups
                ?.filter((group) => group.type == 'SingleChoice')
                .map((materialOptionGroup: MaterialOptionGroup) => (
                  <>
                    <Typography variant="body1">
                      {materialOptionGroup.actionName}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {materialOptionGroup.materialOptions?.map(
                        (materialOption: MaterialOption) => {
                          const label = materialOption.shortDescription
                            ? materialOption.caption +
                              ' (' +
                              materialOption.shortDescription +
                              ')'
                            : materialOption.caption
                          return (
                            <>
                              <FormControlLabel
                                control={<Radio />}
                                label={materialOption.caption}
                                value={materialOption.materialOptionId}
                              ></FormControlLabel>
                              {materialOption.shortDescription}
                            </>
                          )
                        }
                      )}
                    </RadioGroup>
                  </>
                ))}
              {roomType.materialOptionGroups
                ?.filter((group) => group.type == 'AddOn')
                .map((materialOptionGroup: MaterialOptionGroup) => (
                  <>
                    <Typography variant="body1">
                      {materialOptionGroup.actionName}
                    </Typography>
                    {materialOptionGroup.materialOptions?.map(
                      (materialOption: MaterialOption) => (
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            materialOption.caption +
                            ' ' +
                            materialOption.shortDescription
                          }
                        ></FormControlLabel>
                      )
                    )}
                  </>
                ))}
              {/* {options.concepts?.map((materialOption: MaterialOption) => (
                <Typography variant="body1">
                  Bild på {materialOption.caption}
                </Typography>
              ))}
              <DropDown
                id={options.roomTypeId + '_concept'}
                label="Välj koncept"
                defaultValue={defaultValue}
                options={options.concepts.map(
                  (materialOption: MaterialOption) => {
                    return {
                      value: materialOption.materialOptionId,
                      label: materialOption.caption,
                    }
                  }
                )}
                onSelect={(value: string) => {
                  //create new array to remove any old choice
                  const newChoices = conceptChoices.filter(
                    (choice) => choice.roomTypeId != options.roomTypeId
                  )

                  if (value != defaultValue) {
                    newChoices.push({
                      materialOptionId: value,
                      roomTypeId: options.roomTypeId,
                      status: 'Draft',
                      dateOfSubmission: new Date(),
                    })
                  }

                  setConceptChoices(newChoices)
                }}
              />

              <Typography variant="body1">Tillval</Typography>
              {options.addOns?.map((materialOption: MaterialOption) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={materialOption.caption}
                ></FormControlLabel>
              ))} */}
              <Divider />
            </>
          ))}
      </Box>
    </>
  )
}

export default Lease
