const ServerLoading = (props: IServerLoadingProps) => {
  const { serverLoading } = props;
  return (
    <>
      {serverLoading ? <div className="my-4">Loading on Server...</div> : <></>}
    </>
  );
};

export default ServerLoading;

interface IServerLoadingProps {
  serverLoading: boolean;
}
