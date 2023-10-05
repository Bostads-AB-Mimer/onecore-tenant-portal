import { Alert, Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState<string>('')
  const [params] = useSearchParams()

  useEffect(() => {
    switch (params.get('error')) {
      case null:
      case '':
        setError('')
        break
      case '401':
        setError('Tyvärr hittades inte ditt kontrakt.')
        break
      default:
        setError('Inloggning misslyckades!')
        break
    }
  }, [params])

  return (
    <Stack rowGap={1} justifyContent="flex-start">
      <Typography variant="h1">Välkommen!</Typography>
      <Typography variant="body1">
        Vänligen logga in för att komma åt ditt kontrakt
      </Typography>
      <Button
        variant="text"
        onClick={() => {
          const redirectQuery =
            params.get('redirectUrl') && params.get('redirectUrl') != ''
              ? '?redirectUrl=' + params.get('redirectUrl')
              : ''
          location.href = '/api/auth/login' + redirectQuery
        }}
        sx={{
          marginTop: 2,
          borderRadius: 0,
          bgcolor: '#53565a',
          color: 'white',
          '&:hover': { backgroundColor: 'secondary.main', color: 'white' },
        }}
      >
        Logga in med BankID
      </Button>
      {error != '' && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}

export default Login
