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
  SuccessIndicator,
  UploadXHRIndicator,
  CancelIndicator,
  UploadFileForm,
} from "./components";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import {
  previewItems,
  setPreview,
  setUploadProgress,
  uploadProgression,
  resetUploadProgress,
  setServerLoading,
} from "./features/upload/uploadSlice";

const FileUploader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadXHR, setUploadXHR] = useState<XMLHttpRequest | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  const preview = useAppSelector(previewItems);
  const uploadProgress = useAppSelector(uploadProgression);
  const dispatch = useAppDispatch();

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
    dispatch(setPreview(previewItems));

    // free memory when ever this component is unmounted
    return () => {
      previewItems.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [selectedFiles, dispatch]);

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
    dispatch(setPreview(previewItems));
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
            dispatch(setUploadProgress({ index, progress }));
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
    dispatch(setServerLoading(true));

    try {
      await Promise.all(promises);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setUploadXHR(null);
      dispatch(resetUploadProgress());
      dispatch(setServerLoading(false));
    }
  };

  const handleCancelUpload = () => {
    if (uploadXHR) {
      uploadXHR.abort();
      setUploadXHR(null);
      dispatch(resetUploadProgress());
      dispatch(setServerLoading(false));
      setIsSuccess(false);
      setIsError(false);
      setIsCanceled(true);
    }
  };

  const handleUploadMore = () => {
    resetUploadStatuses();
    setSelectedFiles([]);
    dispatch(setPreview([]));
    inputRef!.current!.click();
  };

  const handleTryAgain = () => {
    resetUploadStatuses();
    setUploadXHR(null);
    dispatch(resetUploadProgress());
    dispatch(setServerLoading(false));
  };

  const handleInputClick = () => {
    inputRef!.current!.value = "";
    resetUploadStatuses();
  };

  return (
    <div className="flex h-screen flex-col items-center  justify-center bg-gray-100">
      <UploadFileForm
        isError={isError}
        handleTryAgain={handleTryAgain}
        handleOnUpload={handleOnUpload}
        handleFileChange={handleFileChange}
        handleInputClick={handleInputClick}
        inputRef={inputRef}
        handleRemoveImage={handleRemoveImage}
        selectedFiles={selectedFiles}
      />
      <Progress uploadProgress={uploadProgress} />
      <div>
        <ServerLoadingIndicator />
        <UploadXHRIndicator
          uploadXHR={uploadXHR}
          handleCancelUpload={handleCancelUpload}
        />
        <SuccessIndicator
          isSuccess={isSuccess}
          handleUploadMore={handleUploadMore}
        />
        <CancelIndicator uploadXHR={uploadXHR} isCanceled={isCanceled} />
      </div>
    </div>
  );
};

export default FileUploader;
