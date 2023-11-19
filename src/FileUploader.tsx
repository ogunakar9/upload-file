import React, { useState, ChangeEvent, useEffect, MouseEvent } from "react";
import { POST_URL, MAX_FILE_SIZE } from "./utility/constants";

const FileUploader: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[] | undefined>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [serverLoading, setServerLoading] = useState<boolean>(false);
  const [uploadXHR, setUploadXHR] = useState<XMLHttpRequest | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //FIXME: readding the same file after removing it will not trigger the onChange event
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
      URL.createObjectURL(file)
    );
    // setPreview((prevState) => [...prevState!, objectUrl]);
    setPreview(previewItems);

    // free memory when ever this component is unmounted
    return () => {
      previewItems.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [selectedFiles]);

  //TODO: extract to helper
  const handleRemoveImage = (imageName: string, index: number) => {
    //TODO: find a better way to remove the image from files Array
    //FIXME: adding same file twice will cause a bug for finding index
    const newFiles = Array.from(selectedFiles).filter(
      (file) => index !== selectedFiles.indexOf(file)
    );
    setSelectedFiles(newFiles);

    const previewItems = Array.from(preview!).filter(
      (item) => imageName !== item
    );
    setPreview(previewItems);
  };

  const handleOnClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
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
          reject(new Error("File upload failed"));
          //TODO: file mount & upload error state
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

    Promise.all(promises)
      .then(() => {
        setUploadXHR(null);
        setUploadProgress([]);
        setServerLoading(false);
      })
      .catch((error) => {
        console.error(error);
        //TODO: server error state
      });
  };

  const handleCancelUpload = () => {
    if (uploadXHR) {
      uploadXHR.abort();
      setUploadXHR(null);
    }
  };

  return (
    <>
      <form method="post" encType="multipart/form-data" action="">
        <label style={{ cursor: "pointer" }}>
          <span>Upload files</span>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
        </label>
        <div>
          <h4>Selected Files:</h4>
          <ul>
            {preview && preview.length ? (
              preview.map((imgSrc, index) => {
                return (
                  <div key={index}>
                    <li>{selectedFiles[index].name}</li>
                    <button onClick={() => handleRemoveImage(imgSrc, index)}>
                      x
                    </button>
                    <img src={imgSrc} alt="" />
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </ul>
        </div>
        <button onClick={(e) => handleOnClick(e)}>upload</button>
      </form>

      <div>
        <h4>Upload Progress:</h4>
        <ul>
          {uploadProgress.map((progress, index) => (
            <li key={index}>{`File ${index + 1}: ${progress.toFixed(2)}%`}</li>
          ))}
        </ul>
      </div>
      {serverLoading && <div>Loading on Server...</div>}
      {uploadXHR && (
        <button onClick={handleCancelUpload} type="button">
          Cancel Upload
        </button>
      )}
    </>
  );
};

export default FileUploader;
