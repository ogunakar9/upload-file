import Selected from "./Selected";

const Upload = (props: IUploadProps) => {
  const {
    isError,
    handleTryAgain,
    handleOnUpload,
    inputRef,
    handleFileChange,
    handleInputClick,
    handleRemoveImage,
    selectedFiles,
  } = props;

  return (
    <form
      method="post"
      encType="multipart/form-data"
      action=""
      className="my-8"
    >
      <label
        htmlFor="fileInput"
        className="relative block cursor-pointer border-2 border-dashed border-gray-400 p-4 text-center"
      >
        <span className="text-blue-500">Upload files</span>
        <input
          id="fileInput"
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          multiple
          className="invisible absolute bottom-0 left-0 right-0 top-0 z-10"
          onClick={handleInputClick}
        />
      </label>
      <Selected
        isError={isError}
        handleTryAgain={handleTryAgain}
        handleOnUpload={handleOnUpload}
        selectedFiles={selectedFiles}
        handleRemoveImage={handleRemoveImage}
      />
    </form>
  );
};

export default Upload;

interface IUploadProps {
  isError: boolean;
  handleTryAgain: () => void;
  handleOnUpload: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: () => void;
  handleRemoveImage: (
    imageName: string,
    index: number,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
  selectedFiles: File[];
}
