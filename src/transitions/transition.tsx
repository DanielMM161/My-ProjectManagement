import React from 'react';

import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

export default Transition;
