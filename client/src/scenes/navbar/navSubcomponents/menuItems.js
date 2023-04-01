const menuItems = (isAuth, fullName, navigate, logout) =>
  isAuth
    ? [
        {
          value: fullName,
          label: fullName,
        },
        {
          value: 'LogOut',
          label: 'Log Out',
          onClick: logout,
        },
      ]
    : [
        {
          value: 'Login',
          label: 'Login',
          onClick: () => navigate('/login'),
        },
        {
          value: 'Register',
          label: 'Register',
          onClick: () => navigate('/register'),
        },
      ];

export default menuItems;
