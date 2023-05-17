import {
  ChatOutlined,
  ChecklistOutlined,
  HomeOutlined,
  MenuOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Toolbar,
} from '@mui/material';

function App() {
  return (
    // items-center justify-center
    <div className="flex h-screen w-screen flex-col ">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start">
            <MenuOutlined></MenuOutlined>
          </IconButton>
        </Toolbar>
      </AppBar>

      <BottomNavigation>
        <BottomNavigationAction
          label="Alt 1"
          icon={<HomeOutlined></HomeOutlined>}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Alt 2"
          icon={<ChatOutlined></ChatOutlined>}
        ></BottomNavigationAction>
        <BottomNavigationAction
          label="Alt 3"
          icon={<ChecklistOutlined></ChecklistOutlined>}
        ></BottomNavigationAction>
      </BottomNavigation>
    </div>
  );
}

export default App;
