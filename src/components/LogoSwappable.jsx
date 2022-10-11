import Loader from "./Loader";
import { Helmet } from "react-helmet";

const LogoSwappable = () => {
  return (
    <div>
      <Helmet>
        <link rel="preload" href="pokemon-logo.png" as="image" />
      </Helmet>
      <Loader />
    </div>
  );
};

export default LogoSwappable;
