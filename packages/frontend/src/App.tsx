import {
  ChecklistOutlined,
  HandshakeOutlined,
  HomeOutlined,
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Contract from './pages/Contract';
import Progress from './pages/Progress';

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col ">
      <Paper className="h-screen w-screen p-7">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/kontrakt" element={<Contract></Contract>} />
          <Route path="/att-gora" element={<Progress></Progress>} />
        </Routes>
      </Paper>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          onChange={(event, newValue) => {
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            label="Hem"
            value="/"
            icon={<HomeOutlined></HomeOutlined>}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Mina kontrakt"
            value="/kontrakt"
            icon={<HandshakeOutlined></HandshakeOutlined>}
          ></BottomNavigationAction>
          <BottomNavigationAction
            label="Att göra"
            value="/att-gora"
            icon={<ChecklistOutlined></ChecklistOutlined>}
          ></BottomNavigationAction>
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default App;
