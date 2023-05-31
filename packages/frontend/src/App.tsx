import { CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { AxiosError } from 'axios'

import Home from './pages/Home'
import Lease from './pages/Lease/Lease'
import Progress from './pages/Progress'
import SiteHeader from './components/SiteHeader'
import BisonBold from '../assets/Bison-Bold.woff2'
import GraphikRegular from '../assets/Graphik-Regular.woff2'

const bisonBold = {
  fontFamily: 'bisonBold',
  fontStyle: 'bold',
  fontDisplay: 'swap',
  fontWeight: 900,
  src: `
    url(${BisonBold}) format('woff2')
  `,
}
const graphikRegular = {
  fontFamily: 'graphikRegular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    url(${GraphikRegular}) format('woff2')
  `,
}

const mdTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'white',
    },
    divider: '#951B81',
  },
  typography: {
    h1: {
      fontSize: 32,
      textTransform: 'uppercase',
      fontFamily: 'bisonBold',
      fontWeight: 900,
    },
    h2: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontFamily: 'bisonBold',
      fontWeight: 900,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 14,
    },
    body1: {
      fontSize: 14,
      fontFamily: 'graphikRegular',
    },
    body2: {
      fontSize: 20,
      fontFamily: 'graphikRegular',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: [{ '@font-face': bisonBold }, { '@font-face': graphikRegular }],
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: 10,
          marginBottom: 10,
        },
      },
    },
  },
})

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if ((error as AxiosError).response?.status === 401) {
        location.replace('/login')
      } else {
        console.log('An error occurred fetching data', error)
      }
    },
  }),
})

function App() {
  const navigate = useNavigate()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/mitt-boende" element={<Lease></Lease>} />
              <Route path="/att-gora" element={<Progress></Progress>} />
            </Routes>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
