import { Snackbar, Alert } from '@mui/material';
import { useNotificationContext } from 'contexts/NotificationContext';

const Notification = () => {
  const { notification, notificationCloseHandler } = useNotificationContext();

  return (
    notification.open && (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={notificationCloseHandler}
        anchorOrigin={{
          vertical: notification.vertical,
          horizontal: notification.horizontal,
        }}
      >
        <Alert
          onClose={notificationCloseHandler}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    )
  );
};

export default Notification;
