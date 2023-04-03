import { createContext, useContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    vertical: '',
    horizontal: '',
    severity: '',
    message: '',
  });

  const notificationHandler = (props) => setNotification({...props});

  const notificationCloseHandler = () =>
    notificationHandler({
      open: false,
      message: '',
      severity: '',
      vertical: '',
      horizontal: '',
    });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationHandler,
        notificationCloseHandler
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
