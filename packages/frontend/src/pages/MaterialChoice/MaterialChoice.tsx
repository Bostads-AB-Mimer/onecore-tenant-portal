import { Typography, Divider, Grid, Box } from '@mui/material'

import { useMaterialOptions } from './hooks/useMaterialOptions'
import { MaterialOptions, MaterialOption } from '../../common/types'
import { useEffect } from 'react'

const Lease = () => {
  //   const { data } = useLease({ leaseId: '123' })
  //   const lease = data?.data?.lease

  const { data } = useMaterialOptions({ apartmentId: '123' })
  const materialOptionsList = data?.data?.materialOptions

  useEffect(() => {
    // console.log('materialOptionsList', data?.data?.materialOptions)
  }, [data])

  return (
    <>
      <Box>
        <Typography variant="h1">Dags för materialval</Typography>
        <Typography variant="body1">
          Det har nu blivit dags att göra materialval för ditt kommande boende!
        </Typography>
        <Divider />

        {materialOptionsList?.map((options: MaterialOptions) => (
          <>
            <Typography variant="h2">{options.roomTypeName}</Typography>
            {options.concepts?.map((materialOption: MaterialOption) => (
              <Typography variant="body1">{materialOption.caption}</Typography>
            ))}
            {options.addOns?.map((materialOption: MaterialOption) => (
              <Typography variant="body1">{materialOption.caption}</Typography>
            ))}
            <Divider />
          </>
        ))}
      </Box>
    </>
  )
}

export default Lease
