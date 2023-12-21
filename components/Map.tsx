import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box } from "@mui/material";

const Map = () => {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });
      const { Map }: any = await loader.importLibrary("maps");
      // marcador
      const { Marker } = (await loader.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;
      const position = {
        lat: -57.95453,
        lng: -34.92145,
      };
      // map options
      const mapOptions = (google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "NEXTJS_MAPID",
      });

      const map = new Map(mapRef.current, mapOptions);

      const martker = new Marker({
        map: map,
        position: position,
      });
    };
    initMap();
  }, []);

  return (
    <Box sx={{ height: "100vh" }} ref={mapRef}>
      holi
    </Box>
  );
};

export default Map;
