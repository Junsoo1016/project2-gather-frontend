import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default function Address(props) {
  
  return (
    <div className="App">
      <LocationInput postInputForm={props.postInputForm} setPostInputForm={props.setPostInputForm} />
    </div>
  );
}

function LocationInput(props) {
  const [address, setAddress] = useState("");

  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSelectAddress = (newAddress) => {
    setAddress(newAddress);
    console.log(newAddress);
    geocodeByAddress(newAddress)
    .then((results) => getLatLng(results[0]))
    .then(
      (latLng) => 
      props.setPostInputForm({
        complete: props.postInputForm.complete,
        date: props.postInputForm.date,
        description: props.postInputForm.description,
        location: newAddress,
        coordinates: latLng,
        title: props.postInputForm.title,
        requested: false
      })  
      )
    .catch((error) => console.error("Error", error));   
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChangeAddress}
      onSelect={handleSelectAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input style={{width: '385px'}}
            {...getInputProps({
              placeholder: "Location",
              className: "location-search-input"
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "rgb(104,217,155)", cursor: "pointer"}
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
