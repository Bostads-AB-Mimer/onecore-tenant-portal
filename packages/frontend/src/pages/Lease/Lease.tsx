import { Typography, Divider, Grid, Box } from '@mui/material'

import { useLease } from './hooks/useLease'
import floorPlan from '../../../assets/planlosning.png'
import { Person } from '../../common/types'

const Lease = () => {
  const { data } = useLease({ leaseId: '123' })
  const lease = data?.data?.lease

  return (
    <>
      <Box>
        <Typography variant="h1">Mitt boende</Typography>
        <Divider />
        <Typography variant="h2">Basinformation</Typography>
        {lease && (
          <>
            <Grid container sx={{ marginLeft: 1, marginTop: 1 }}>
              <Grid item xs={12} sx={{ marginBottom: 2 }}>
                Kontraktsnummer <b>{lease.leaseId}</b>
                <br />
                Lantmäteriets lägenhetsnummer{' '}
                <b>{lease.apartment?.apartmentNumber}</b>
                <br />
              </Grid>
              <Grid item xs={4}>
                Adress
              </Grid>
              <Grid item xs={8}>
                <b>
                  {lease.apartment?.address?.street +
                    ' ' +
                    lease.apartment?.address?.number}
                </b>
              </Grid>
              <Grid item xs={4}>
                Typ
              </Grid>
              <Grid item xs={8}>
                <b>{lease.apartment?.apartmentType}</b>
              </Grid>
              <Grid item xs={4}>
                Storlek
              </Grid>
              <Grid item xs={8}>
                <b>{lease.apartment?.size} m2</b>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ marginTop: 2, marginBottom: 2, marginRight: 3 }}
              >
                <img src={floorPlan} width="75%" />
              </Grid>
              <Grid item xs={6}>
                Inflyttningsdatum
              </Grid>
              <Grid item xs={6}>
                <b>{lease.leaseStartDate.toString().split('T')[0]}</b>
              </Grid>
              <Grid item xs={6}>
                Status kontrakt
              </Grid>
              <Grid item xs={6}>
                <b>{lease.status}</b>
              </Grid>
              <Grid item xs={6}>
                Gäller till och med
              </Grid>
              <Grid item xs={6}>
                <b>{lease.leaseEndDate.toString().split('T')[0]}</b>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="h2">Kontraktsinnehavare</Typography>
            <Grid container sx={{ marginLeft: 1, marginTop: 1 }}>
              <Grid item xs={12}>
                {lease.tenants &&
                  lease.tenants.map((tenant: Person) => (
                    <Box sx={{ marginBottom: 1 }} key={tenant.personId}>
                      {tenant.firstName + ' ' + tenant.lastName}
                      <br />
                      {tenant.nationalRegistrationNumber}
                    </Box>
                  ))}
              </Grid>
            </Grid>
            <Divider sx={{ paddingTop: 0, marginTop: 0 }} />
            <Typography variant="h2">Hyra</Typography>
            <Grid container sx={{ marginLeft: 1, marginTop: 1 }}>
              <Grid item xs={6}>
                Nuvarande hyra
              </Grid>
              <Grid item xs={6}>
                <b>{lease.rent.currentRent + ' kr/mån'}</b>
              </Grid>
              <Grid item xs={6}>
                {lease.rent.additionalChargeDescription}
              </Grid>
              <Grid item xs={6}>
                <b>{lease.rent.additionalChargeAmount + ' kr/mån'}</b>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="h2">Övrig information</Typography>
            <Grid container sx={{ marginLeft: 1, marginTop: 1 }}>
              <Grid item xs={12}>
                {lease.apartment?.otherInfo}
              </Grid>
            </Grid>
            <Divider />
          </>
        )}
      </Box>
    </>
  )
}

export default Lease
