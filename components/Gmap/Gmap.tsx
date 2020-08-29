import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { useState, useEffect, useRef, FC } from "react";
import { useStoreState } from "../../hooks";

type GoogleMapsProps = {
  apiKey: string;
  location: { lat: number; lng: number };
  maxZoom: number;
  defaultZoom: number;
  frameImgUrl?: string;
};

const GoogleMaps: FC<GoogleMapsProps> = ({
  apiKey,
  location,
  maxZoom,
  defaultZoom,
  frameImgUrl,
}) => {
  const [height, setHeight] = useState(387);
  const width = useStoreState((state) => state.device.width);
  const wheight = useStoreState((state) => state.device.height);
  const ImgRef = useRef<any>();
  useEffect(() => {
    ImgRef && setHeight(ImgRef.current.height);
  }, [width, wheight]);
  return (
    <div
      className="swiper-no-swiping"
      style={{
        width: "100%",
        maxWidth: 624,
        position: "relative",
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,drawing,places`}
        location={location}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        maxZoom={maxZoom}
        defaultZoom={defaultZoom}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <img
          ref={ImgRef}
          src={frameImgUrl}
          alt={"frame"}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
export default GoogleMaps;

const MapWithAMarker = withScriptjs(
  withGoogleMap((props: any) => (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={props.location}
      defaultOptions={{
        fullscreenControl: false,
        streetViewControl: false,
        scaleControl: false,
        zoomControl: false,
        maxZoom: props.maxZoom,
        mapTypeControl: false,
      }}
    >
      <Marker position={props.location} />
    </GoogleMap>
  ))
);
