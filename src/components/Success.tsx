const Success = (props: ISuccessProps) => {
  const { isSuccess, handleUploadMore } = props;

  return (
    <>
      {isSuccess ? (
        <div className="my-4">
          <span className="text-green-500">upload successful!</span>
          <button
            className="focus:shadow-outline-blue ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
            onClick={handleUploadMore}
          >
            upload more
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Success;

interface ISuccessProps {
  isSuccess: boolean;
  handleUploadMore: () => void;
}
