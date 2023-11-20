const UploadXHR = (props: UploadXHRProps) => {
  const { uploadXHR, handleCancelUpload } = props;

  return (
    <>
      {uploadXHR && (
        <button
          onClick={handleCancelUpload}
          className="focus:shadow-outline-red rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none active:bg-red-800"
        >
          Cancel Upload
        </button>
      )}
    </>
  );
};

export default UploadXHR;

interface UploadXHRProps {
  uploadXHR: XMLHttpRequest | null;
  handleCancelUpload: () => void;
}
