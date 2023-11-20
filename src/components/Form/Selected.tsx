import Preview from "./Preview";
import Error from "./Error";

const Selected = (props: ISelectedProps) => {
  const { handleTryAgain, handleOnUpload, selectedFiles, handleRemoveImage } =
    props;
  return (
    <>
      {selectedFiles && selectedFiles.length ? (
        <>
          <h4 className="my-4 text-lg font-semibold">Selected Files:</h4>
          <Preview
            selectedFiles={selectedFiles}
            handleRemoveImage={handleRemoveImage}
          />
          <Error
            handleTryAgain={handleTryAgain}
            handleOnUpload={handleOnUpload}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Selected;

interface ISelectedProps {
  selectedFiles: File[];
  handleRemoveImage: (
    imageName: string,
    index: number,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  handleTryAgain: () => void;
  handleOnUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
