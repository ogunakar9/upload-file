const ServerLoading = (props: ServerLoadingProps) => {
  const { serverLoading } = props;
  return (
    <>
      {serverLoading ? <div className="my-4">Loading on Server...</div> : <></>}
    </>
  );
};

export default ServerLoading;

interface ServerLoadingProps {
  serverLoading: boolean;
}
