import { useAppSelector } from "../app/hooks";
import { serverLoadingIndicator } from "../features/upload/uploadSlice";

const ServerLoading = () => {
  const serverLoading = useAppSelector(serverLoadingIndicator);
  return (
    <>
      {serverLoading ? <div className="my-4">Loading on Server...</div> : <></>}
    </>
  );
};

export default ServerLoading;
