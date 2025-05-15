
import './App.css';
import { createTheme, Divider, MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import AppRoutes from './Pages/AppRoutes';

function App() {
  const theme = createTheme({
    focusRing:"never",
    fontFamily: 'Montserrat, sans-serif',
    primaryColor: 'brightSun',
    primaryShade:4,
    colors: {
      // 'brightSun': ['#fffbeb','#fff3c6','#ffe588','#ffd149','#ffbd20','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902'
      // ],
      'brightSun': ['#f0faff','#dbf0ff','#aee4ff','#7dd3fc','#38bdf8','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'
      ],
      'mineShaft': ['#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888','#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#2d2d2d',]
    }
  })
  return (
    <Provider store={Store}>
    <MantineProvider defaultColorScheme='dark' theme={theme} >
      <Notifications position="top-center" zIndex={1000} />
      <AppRoutes/>
    </MantineProvider>
    </Provider>
  );
}

export default App;