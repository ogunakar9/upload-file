const Preview = (props: IPreviewProps) => {
  const { preview, selectedFiles, handleRemoveImage } = props;

  return (
    <ul>
      {preview && preview.length ? (
        preview.map((imgSrc: string, index: number) => {
          return (
            <li key={index} className="my-2 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={(e) => handleRemoveImage(imgSrc, index, e)}
                  className=" mr-1 rounded-full bg-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <span className="mr-2">{selectedFiles[index].name}</span>
              </div>
              <img src={imgSrc} alt="" className="ml-2 max-h-20" />
            </li>
          );
        })
      ) : (
        <></>
      )}
    </ul>
  );
};

export default Preview;

interface IPreviewProps {
  preview: string[] | undefined;
  selectedFiles: File[];
  handleRemoveImage: (
    imageName: string,
    index: number,
    e: React.MouseEvent<HTMLElement>,
  ) => void;
}
