import { useAppSelector } from "../../app/hooks";
import { isErrorState } from "../../features/upload/uploadSlice";

const Error = (props: IErrorProps) => {
  const { handleTryAgain, handleOnUpload } = props;
  const isError = useAppSelector(isErrorState);
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
  handleTryAgain: () => void;
  handleOnUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
