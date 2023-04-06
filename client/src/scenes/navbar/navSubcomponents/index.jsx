import { useIsAuth } from 'hooks/useIsAuth';
import LightDarkMode from './LightDarkMode';
import NavIconsLinks from './NavIconsLinks';
import SelectMenu from './SelectMenu';

const NavSubComponents = () => {
  const isAuth = useIsAuth();

  return (
    <>
      <LightDarkMode />
      {isAuth && <NavIconsLinks />}
      <SelectMenu isAuth={isAuth} />
    </>
  );
};

export default NavSubComponents;
