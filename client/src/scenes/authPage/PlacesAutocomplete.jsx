import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Autocomplete, TextField } from "@mui/material";

const PlacesAutocomplete = ({ handlePlaceSelect }) => {
  const [inputValue, setInputValue] = useState("");

  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      handlePlaceSelect(lat, lng);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Autocomplete
      id="autocomplete"
      sx={{ gridColumn: "span 4" }}
      freeSolo
      options={data.map((suggestion) => suggestion.description)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
        setValue(newInputValue);
      }}
      onChange={(_, newInputValue) => {
        handleSelect(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search a location"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default PlacesAutocomplete;
