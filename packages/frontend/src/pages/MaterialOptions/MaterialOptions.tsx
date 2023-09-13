import {
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Alert,
} from '@mui/material'
import { useState } from 'react'

import {
  useMaterialOptions,
  useSaveMaterialChoices,
} from './hooks/useMaterialOptions'
import {
  MaterialOptionGroup,
  MaterialOption,
  RoomType,
} from '../../common/types'
import DropDown from '../../components/DropDown'
import Carousel from '../../components/Carousel'
import { useNavigate } from 'react-router-dom'

const MaterialOptions = () => {
  const [conceptChoices, setConceptChoices] = useState(
    Array<{
      materialOptionId: string
      materialOptionGroupId: string
      roomTypeId: string
    }>
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const navigate = useNavigate()

  const { data } = useMaterialOptions({ apartmentId: '123' })
  const roomTypes = data?.data?.roomTypes

  const defaultValue = '0'

  /* TODO:
   * Add extra confirm before save to make it clear this is final. BankID?
   */

  const { mutate } = useSaveMaterialChoices(
    () => {
      navigate('/materialval/val')
      setErrorMessage('')
    },
    () => {
      setErrorMessage('Ditt materialval kunde tyvärr inte sparas')
    }
  )

  const save = () => {
    if (!validateChoices(conceptChoices)) return

    mutate(conceptChoices)
  }

  const validateChoices = (choices: Array<any>) => {
    let valid = true

    roomTypes?.forEach((roomType) => {
      roomType.materialOptionGroups?.forEach((materialOptionGroup) => {
        let groupIsValid = false

        //valid oavsett om typ är tillval
        if (materialOptionGroup.type == 'AddOn') groupIsValid = true

        //valid om det inte finns alternativ eller bara ett alternativ
        if (
          !materialOptionGroup.materialOptions ||
          materialOptionGroup.materialOptions.length <= 1
        )
          groupIsValid = true

        if (!groupIsValid) {
          //valid = om choices innehåller en matchande materialOptionGroupId
          groupIsValid =
            choices.filter(
              (choice) =>
                choice.materialOptionGroupId ==
                materialOptionGroup.materialOptionGroupId
            ).length > 0

          if (!groupIsValid) valid = false
        }
      })
    })

    if (!valid) {
      setValidationMessage(
        'Oj det verkar som du missat något val, se över dina val innan du sparar'
      )
      return false
    }
    setValidationMessage('')
    return true
  }

  const saveChoiceToState = ({
    multipleChoice,
    materialOptionId,
    materialOptionGroupId,
    roomTypeId,
  }: {
    multipleChoice: boolean
    materialOptionId: string
    materialOptionGroupId: string
    roomTypeId: string
  }) => {
    const newChoices =
      conceptChoices.filter(
        (choice) =>
          multipleChoice ||
          choice.materialOptionGroupId != materialOptionGroupId
      ) ?? []

    newChoices.push({
      materialOptionId: materialOptionId,
      materialOptionGroupId: materialOptionGroupId,
      roomTypeId: roomTypeId,
    })

    setConceptChoices(newChoices)

    if (validationMessage != '') validateChoices(newChoices)
  }

  const removeChoiceFromState = ({
    materialOptionGroupId,
    materialOptionId,
  }: {
    materialOptionGroupId?: string
    materialOptionId?: string
  }) => {
    const newChoices =
      conceptChoices.filter(
        (choice) =>
          choice.materialOptionGroupId &&
          choice.materialOptionGroupId != materialOptionGroupId &&
          choice.materialOptionId &&
          choice.materialOptionId != materialOptionId
      ) ?? []

    setConceptChoices(newChoices)
  }

  return (
    <>
      <Box>
        <Typography variant="h1">Dags för materialval</Typography>
        <Typography variant="body1">
          Det har nu blivit dags att göra materialval för ditt kommande boende!
        </Typography>
        {conceptChoices &&
          roomTypes?.map((roomType: RoomType, i) => (
            <Box key={i}>
              <Divider />
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
                            link:
                              materialOption.images ||
                              materialOption.description
                                ? '/materialval/detaljer/' +
                                  materialOption.materialOptionId
                                : '',
                            image:
                              '/api/material-options/assets/' +
                              materialOption.coverImage,
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
                            materialOptionGroup.materialOptions.map(
                              (materialOption: MaterialOption) => {
                                return {
                                  value: materialOption.materialOptionId,
                                  label: materialOption.caption,
                                }
                              }
                            ) ?? []
                          }
                          onSelect={(value: string) => {
                            if (value == defaultValue) {
                              removeChoiceFromState({
                                materialOptionGroupId:
                                  materialOptionGroup.materialOptionGroupId,
                              })
                            } else {
                              saveChoiceToState({
                                multipleChoice: false,
                                materialOptionId: value,
                                materialOptionGroupId:
                                  materialOptionGroup.materialOptionGroupId,
                                roomTypeId: roomType.roomTypeId,
                              })
                            }
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
                      name="radio-buttons-group"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const materialOptionId = (
                          event.target as HTMLInputElement
                        ).value

                        saveChoiceToState({
                          multipleChoice: false,
                          materialOptionId: materialOptionId,
                          materialOptionGroupId:
                            materialOptionGroup.materialOptionGroupId,
                          roomTypeId: roomType.roomTypeId,
                        })
                      }}
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
                          control={
                            <Checkbox
                              onChange={(event, checked) => {
                                if (checked) {
                                  saveChoiceToState({
                                    multipleChoice: true,
                                    materialOptionId:
                                      materialOption.materialOptionId,
                                    materialOptionGroupId:
                                      materialOptionGroup.materialOptionGroupId,
                                    roomTypeId: roomType.roomTypeId,
                                  })
                                } else {
                                  removeChoiceFromState({
                                    materialOptionId:
                                      materialOption.materialOptionId,
                                  })
                                }
                              }}
                            />
                          }
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
            </Box>
          ))}
        {validationMessage != '' && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="warning">{validationMessage}</Alert>
          </Box>
        )}
        {errorMessage != '' && (
          <Box sx={{ marginTop: 2 }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
        <Box sx={styles.actionContainer}>
          <Button variant="contained" onClick={save}>
            Spara materialval
          </Button>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

const styles = {
  actionContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}

export default MaterialOptions
