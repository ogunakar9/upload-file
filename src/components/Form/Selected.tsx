import Preview from "./Preview";
import Error from "./Error";

const Selected = (props: ISelectedProps) => {
  const {
    isError,
    handleTryAgain,
    handleOnUpload,
    preview,
    selectedFiles,
    handleRemoveImage,
  } = props;
  return (
    <>
      {selectedFiles && selectedFiles.length ? (
        <>
          <h4 className="my-4 text-lg font-semibold">Selected Files:</h4>
          <Preview
            preview={preview}
            selectedFiles={selectedFiles}
            handleRemoveImage={handleRemoveImage}
          />
          <Error
            isError={isError}
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
  preview: string[] | undefined;
  selectedFiles: File[];
  handleRemoveImage: (
    imageName: string,
    index: number,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  isError: boolean;
  handleTryAgain: () => void;
  handleOnUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
