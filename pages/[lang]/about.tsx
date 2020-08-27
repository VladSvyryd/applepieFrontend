import GoogleMaps from "../../components/Gmap/Gmap";

const about = () => {
  return (
    <GoogleMaps
      apiKey={String(process.env.GOOGLE_MAPS_API_KEY)}
      location={{ lat: 52.4819721, lng: 13.3450566 }}
      defaultZoom={8}
      maxZoom={20}
      frameImgUrl="https://applepie-strapi.s3.eu-central-1.amazonaws.com/map_Frame_cbe61afda7.png?47132.1600000083"
    />
  );
};
export default about;
