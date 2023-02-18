import { useState, useEffect } from 'react';

import { Avatar, Button, Card, CardHeader, Checkbox, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';

import { User } from '../../models/user.model';
import { useAppSelector } from '../../hooks/redux.hook';

function not(a: readonly User[], b: readonly User[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly User[], b: readonly User[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly User[], b: readonly User[]) {
  return [...a, ...not(b, a)];
}

interface ITransferListProp {
  users: User[];
  onUsersIn: (usersIn: User[]) => void;
}

function TransferList({ users, onUsersIn }: ITransferListProp) {
  const userState = useAppSelector((state) => state.user);
  const [checked, setChecked] = useState<readonly User[]>([]);
  const [usersLeft, setUsersLeft] = useState<readonly User[]>(users.filter((item) => item.id !== userState.user.id));
  const [usersRight, setUsersRight] = useState<User[]>([userState.user]);

  const leftChecked = intersection(checked, usersLeft);
  const rightChecked = intersection(checked, usersRight);

  const handleToggle = (value: User) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly User[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly User[]) => () => {
    const newChecked = checked.filter((item) => item.id !== userState.user.id);
    if (numberOfChecked(items) === items.length) {
      setChecked(not(newChecked, items));
    } else {
      setChecked(union(newChecked, items));
    }
  };

  const handleCheckedRight = () => {
    setUsersRight(usersRight.concat(leftChecked));
    onUsersIn(usersRight.concat(leftChecked));
    setUsersLeft(not(usersLeft, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    const newChecked = rightChecked.filter((item) => item.id !== userState.user.id);
    setUsersLeft(usersLeft.concat(newChecked));
    setUsersRight(not(usersRight, newChecked));
    onUsersIn(not(usersRight, newChecked));
    setChecked(not(checked, newChecked));
  };

  const customList = (title: React.ReactNode, items: readonly User[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: User) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role="listitem"
              onClick={handleToggle(value)}
              disabled={value.id === userState.user.id}
            >
              <Checkbox
                checked={checked.indexOf(value) !== -1 && value.id !== userState.user.id}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': labelId,
                }}
              />
              <Avatar alt="Remy Sharp" src={value.avatar} sx={{ width: 24, height: 24, marginRight: 1 }} />
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Out', usersLeft)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('In', usersRight)}</Grid>
    </Grid>
  );
}

export default TransferList;
