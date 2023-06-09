import {
  Typography,
  Divider,
  Box,
  Checkbox,
  FormControlLabel,
} from '@mui/material'

import { useMaterialOptions } from './hooks/useMaterialOptions'
import {
  MaterialOptions,
  MaterialOption,
  MaterialChoice,
} from '../../common/types'
import { useState } from 'react'
import DropDown from '../../components/DropDown'
import { CheckBox } from '@mui/icons-material'

const Lease = () => {
  const [conceptChoices, setConceptChoices] = useState(Array<MaterialChoice>)

  const { data } = useMaterialOptions({ apartmentId: '123' })
  const materialOptionsList = data?.data?.materialOptions

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
          materialOptionsList?.map((options: MaterialOptions) => (
            <>
              <Typography variant="h2">{options.roomTypeName}</Typography>
              {options.concepts?.map((materialOption: MaterialOption) => (
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
              ))}
              <Divider />
            </>
          ))}
      </Box>
    </>
  )
}

export default Lease
