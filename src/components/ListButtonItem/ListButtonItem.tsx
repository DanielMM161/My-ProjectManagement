import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface IButtonIconProps {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ListButtonItem({ title, onClick, children }: IButtonIconProps) {
  return (
    <ListItem key="Dashboard" disablePadding onClick={() => onClick()}>
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListButtonItem;
