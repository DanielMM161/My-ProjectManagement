import { Avatar, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

import ListButtonItem from '../ListButtonItem/ListButtonItem';
import './style.css';

function SideBar() {
  const list = () => (
    <div className="list-container" role="presentation" onClick={() => {}}>
      <List>
        <ListButtonItem title="Dashboard" onClick={() => {}}>
          <DashboardIcon />
        </ListButtonItem>

        <ListButtonItem title="Settings" onClick={() => {}}>
          <SettingsIcon />
        </ListButtonItem>
      </List>
    </div>
  );
  return (
    <div className="side-bar">
      {list()}
      <div className="avatar-section">
        <hr className="divider" />
        <div className="avatar-info">
          <div className="info-name">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 36, height: 36 }} />
            <h3>Avatar Name</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
