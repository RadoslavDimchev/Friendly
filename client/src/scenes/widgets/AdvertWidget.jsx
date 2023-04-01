import { useTheme, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography variant="h5" color={dark} fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        src="http://localhost:3001/assets/radoslav-advert.jpg"
        alt="advert"
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Dimchev Solutions</Typography>
        <Typography color={medium}>dimchevsoluctions.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Let's transform your business together and propel it towards success in
        today's digital landscape.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
