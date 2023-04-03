import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const DeletePostDialog = ({
  isDeleteDialogOpen,
  closeDeleteDialog,
  deletePostHandler,
}) => {
  return (
    <Dialog
      open={isDeleteDialogOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete this post?
      </DialogTitle>
      <DialogActions>
        <Button onClick={deletePostHandler}>Yes</Button>
        <Button onClick={closeDeleteDialog} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePostDialog;
