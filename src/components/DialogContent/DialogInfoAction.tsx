import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface IDialogInfoAction {
  dialogTitle: string;
  contentText: string;
  onClickAccept: () => void;
  onClickCancel: () => void;
}

function DialogInfoAction({ dialogTitle, contentText, onClickAccept, onClickCancel }: IDialogInfoAction) {
  return (
    <>
      <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>

      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={onClickCancel}>
          Cancel
        </Button>
        <Button onClick={onClickAccept} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </>
  );
}

export default DialogInfoAction;
