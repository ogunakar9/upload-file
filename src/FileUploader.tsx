import React, {
  useState,
  ChangeEvent,
  useEffect,
  MouseEvent,
  useRef,
} from "react";
import { POST_URL, MAX_FILE_SIZE } from "./utility";
import {
  Progress,
  ServerLoadingIndicator,
  UploadXHRIndicator,
} from "./components";

const FileUploader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[] | undefined>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [serverLoading, setServerLoading] = useState<boolean>(false);
  const [uploadXHR, setUploadXHR] = useState<XMLHttpRequest | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  //TODO: success, error and cancel states should be handled with notifications

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (!inputFiles) return;
    const files: File[] = Array.from(inputFiles);
    //TODO: extract to helper
    let sizeError = false;
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size is too big!");
        sizeError = true;
        break;
      }
    }
    if (sizeError) return;
    if (inputFiles) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  useEffect(() => {
    // create the preview
    if (!selectedFiles) return;
    const filesArray = Array.from(selectedFiles);

    const previewItems = filesArray.map((file: File) =>
      URL.createObjectURL(file),
    );
    // setPreview((prevState) => [...prevState!, objectUrl]);
    setPreview(previewItems);

    // free memory when ever this component is unmounted
    return () => {
      previewItems.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [selectedFiles]);

  const resetUploadStatuses = () => {
    setIsCanceled(false);
    setIsSuccess(false);
    setIsError(false);
  };

  //TODO: extract to helper
  const handleRemoveImage = (
    imageName: string,
    index: number,
    e: MouseEvent<HTMLElement>,
  ) => {
    //TODO: find a better way to remove the image from files Array
    //FIXME: adding same file twice will cause a bug for finding index
    e.preventDefault();
    resetUploadStatuses();
    const newFiles = Array.from(selectedFiles).filter(
      (file) => index !== selectedFiles.indexOf(file),
    );
    setSelectedFiles(newFiles);

    const previewItems = Array.from(preview!).filter(
      (item) => imageName !== item,
    );
    setPreview(previewItems);
  };

  const handleOnUpload = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    resetUploadStatuses();
    if (!selectedFiles.length) return;

    const xhrArray: XMLHttpRequest[] = [];
    const promises = selectedFiles.map((file, index) => {
      return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setUploadProgress((prevProgress) => {
              const newProgress = [...prevProgress];
              newProgress[index] = progress;
              return newProgress;
            });
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error(`File upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          setIsError(true);
          reject(new Error("File upload failed"));
        };

        xhr.open("POST", POST_URL, true);
        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);

        xhrArray.push(xhr);
      });
    });

    setUploadXHR(xhrArray.length ? xhrArray[0] : null);
    setServerLoading(true);

    try {
      await Promise.all(promises);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setUploadXHR(null);
      setUploadProgress([]);
      setServerLoading(false);
    }
  };

  const handleCancelUpload = () => {
    if (uploadXHR) {
      uploadXHR.abort();
      setUploadXHR(null);
      setUploadProgress([]);
      setServerLoading(false);
      setIsSuccess(false);
      setIsError(false);
      setIsCanceled(true);
    }
  };

  const handleUploadMore = () => {
    resetUploadStatuses();
    setSelectedFiles([]);
    setPreview([]);
    inputRef!.current!.click();
  };

  const handleTryAgain = () => {
    resetUploadStatuses();
    setUploadXHR(null);
    setUploadProgress([]);
    setServerLoading(false);
  };

  const handleInputClick = () => {
    inputRef!.current!.value = "";
    resetUploadStatuses();
  };

  return (
    <div className="flex h-screen flex-col items-center  justify-center bg-gray-100">
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

        {selectedFiles.length ? (
          <>
            <h4 className="my-4 text-lg font-semibold">Selected Files:</h4>
            <ul>
              {preview && preview.length ? (
                preview.map((imgSrc, index) => {
                  return (
                    <li
                      key={index}
                      className="my-2 flex items-center justify-between"
                    >
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
                        <span className="mr-2">
                          {selectedFiles[index].name}
                        </span>
                      </div>
                      <img src={imgSrc} alt="" className="ml-2 max-h-20" />
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
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
        ) : (
          <></>
        )}
      </form>
      <Progress uploadProgress={uploadProgress} />
      <div>
        <ServerLoadingIndicator serverLoading={serverLoading} />

        <UploadXHRIndicator
          uploadXHR={uploadXHR}
          handleCancelUpload={handleCancelUpload}
        />
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
        {isCanceled && !uploadXHR ? (
          <span className="text-yellow-500">
            you canceled the upload request!
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
