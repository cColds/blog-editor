import { BounceLoader } from "react-spinners";

const override: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderColor: "#646cff",
};

function Loading({ loading }: { loading: boolean }) {
  return (
    <BounceLoader
      color={"#646cff"}
      loading={loading}
      cssOverride={override}
      size={75}
      aria-label="Loading Spinner"
    />
  );
}

export default Loading;
