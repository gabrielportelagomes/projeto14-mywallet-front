import { ThreeDots } from "react-loader-spinner";

function LoadingButton() {
  return (
    <ThreeDots
      height="50"
      width="80"
      radius="9"
      color="#c6c6c6"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
}

export default LoadingButton;