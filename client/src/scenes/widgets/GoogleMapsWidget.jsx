import { Box } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import WidgetWrapper from "components/WidgetWrapper";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const GoogleMapsWidget = ({ user }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (loadError) {
    return <Box>Map cannot be loaded right now, sorry.</Box>;
  }
  const position = { lat: user?.coordinates?.lat, lng: user?.coordinates?.lng };
  const hasPosition = !!position.lat;
  const defaultPosition = { lat: 41.562264, lng: 23.278419 };

  return (
    <WidgetWrapper mt="2rem">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={hasPosition ? position : defaultPosition}
          zoom={12}
        >
          {hasPosition && <Marker position={position} />}
        </GoogleMap>
      ) : (
        "Loading..."
      )}
    </WidgetWrapper>
  );
};

export default GoogleMapsWidget;
