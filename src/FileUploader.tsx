// FileUploader.tsx
import React, { useState, ChangeEvent, useEffect } from "react";

const FileUploader: React.FC = () => {
  const MAX_FILE_SIZE = 50000;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[] | undefined>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (!inputFiles) return;

    const files: File[] = Array.from(inputFiles);

    let sizeError = false;
    for (const file of files) {
      console.log("file", file.size);

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

  const handleRemoveImage = (imageName: string, index: number) => {
    //TODO: find a better way to remove the image from files Array
    const newFiles = Array.from(selectedFiles).filter(
      (file) => index !== selectedFiles.indexOf(file)
    );
    setSelectedFiles(newFiles);

    const previewItems = Array.from(preview!).filter(
      (item) => imageName !== item
    );
    setPreview(previewItems);
  };

  return (
    <div>
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
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      {preview && preview.length ? (
        preview.map((imgSrc, index) => {
          return (
            <div key={index}>
              <button onClick={() => handleRemoveImage(imgSrc, index)}>
                x
              </button>
              <img key={index} src={imgSrc} alt="" />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileUploader;
