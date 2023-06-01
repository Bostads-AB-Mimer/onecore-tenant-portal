import { CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { AxiosError } from 'axios'

import Home from './pages/Home'
import Lease from './pages/Lease/Lease'
import Progress from './pages/Progress'
import SiteHeader from './components/SiteHeader'
import Bison from '../assets/Bison-Regular.woff2'
import BisonBold from '../assets/Bison-Bold.woff2'
import GraphikRegular from '../assets/Graphik-Regular.woff2'
import GraphikBold from '../assets/Graphik-Bold.woff2'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true
  }
}

const bison = {
  fontFamily: 'bison',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    url(${Bison}) format('woff2')
  `,
}
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
const graphikBold = {
  fontFamily: 'graphikBold',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    url(${GraphikBold}) format('woff2')
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
    title: {
      fontSize: 36,
      textTransform: 'uppercase',
      fontFamily: 'bison',
      paddingTop: 10,
    },
    h1: {
      fontSize: 32,
      textTransform: 'uppercase',
      fontFamily: 'bisonBold',
      fontWeight: 900,
      paddingTop: 10,
    },
    h2: {
      fontSize: 20,
      textTransform: 'uppercase',
      fontFamily: 'bisonBold',
      fontWeight: 900,
      paddingTop: 10,
    },
    h3: {
      fontSize: 14,
      fontFamily: 'graphikRegular',
      paddingTop: 10,
      fontWeight: 900,
    },
    h4: {
      fontSize: 14,
    },
    body1: {
      fontSize: 14,
      fontFamily: 'graphikRegular',
    },
    body2: {
      fontSize: 12,
      fontFamily: 'graphikRegular',
      paddingTop: 5,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: [
          { '@font-face': bison },
          { '@font-face': bisonBold },
          { '@font-face': graphikRegular },
          { '@font-face': graphikBold },
        ],
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          paddingTop: 7,
          paddingBottom: 7,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title: 'h1',
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
        <Grid container sx={{ marginBottom: 2 }}>
          <Grid item xs={0.5} />
          <Grid item xs={11}>
            <SiteHeader />
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/mitt-boende" element={<Lease></Lease>} />
              <Route path="/att-gora" element={<Progress></Progress>} />
            </Routes>
          </Grid>
          <Grid item xs={0.5} />
        </Grid>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
