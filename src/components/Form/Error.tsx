const Error = (props: IErrorProps) => {
  const { isError, handleTryAgain, handleOnUpload } = props;
  return (
    <>
      {isError ? (
        <>
          <div className="my-4 text-red-500">upload failed!</div>
          <button
            className="focus:shadow-outline-blue rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
            onClick={handleTryAgain}
          >
            try again!
          </button>
        </>
      ) : (
        <button
          className="focus:shadow-outline-blue rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none active:bg-blue-800"
          onClick={(e) => handleOnUpload(e)}
        >
          upload
        </button>
      )}
    </>
  );
};

export default Error;

interface IErrorProps {
  isError: boolean;
  handleTryAgain: () => void;
  handleOnUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
