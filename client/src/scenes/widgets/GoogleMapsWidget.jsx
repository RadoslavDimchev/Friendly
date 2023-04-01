import { Box } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import WidgetWrapper from "components/WidgetWrapper";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const GoogleMapsWidget = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <Box>Map cannot be loaded right now, sorry.</Box>;
  }

  return (
    <WidgetWrapper mt="2rem">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 37.7749, lng: -122.4194 }}
          zoom={12}
        ></GoogleMap>
      ) : (
        "Loading..."
      )}
    </WidgetWrapper>
  );
};

export default GoogleMapsWidget;
