import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { POST_URL } from "./features/upload/uploadAPI";

const App = () => {
  const MAX_FILE_SIZE = 50000;
  const [files, setFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string[] | undefined>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (!inputFiles) return;

    const filesArray = Array.from(inputFiles);

    let sizeError = false;
    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size is too big!");
        sizeError = true;
        break;
      }
    }

    if (sizeError) return;
    setFiles(inputFiles);

    const formData = new FormData();

    // console.log("inputFiles", inputFiles);

    for (const file in inputFiles) {
      formData.append("file", file);
    }

    // console.log("xx", formData.get("file"));
  };

  // useEffect(() => {
  //   if (files && files.length) {
  //     const formData = new FormData();

  //     for (const file in files) {
  //       formData.append("file", file);
  //     }

  //     console.log("xx", formData.get("file"));

  //     // fetch(POST_URL, {
  //     //   method: "POST",
  //     //   body: formData,
  //     // })
  //     //   .then((res) => res.json())
  //     //   .then((res) => console.log(res));
  //   }
  // }, [files]);

  useEffect(() => {
    // create the preview
    if (!files) return;
    const filesArray = Array.from(files);

    const previewItems = filesArray.map((file: File) =>
      URL.createObjectURL(file)
    );
    // setPreview((prevState) => [...prevState!, objectUrl]);
    setPreview(previewItems);

    // free memory when ever this component is unmounted
    return () => {
      previewItems.forEach((item) => URL.revokeObjectURL(item));
    };
  }, [files]);

  return (
    <div className="App">
      <h1
        className="text-3xl font-bold
        underline"
      >
        Hello world!
      </h1>
      <input type="file" multiple onChange={handleInputChange} />
      {/* {files &&
        Array.from(files).map((file: File) => {
          return (
            <section key={file.name}>
              File details:
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {file.size} bytes</li>
              </ul>
            </section>
          );
        })} */}

      {preview && preview.length ? (
        preview.map((imgSrc, index) => <img key={index} src={imgSrc} alt="" />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
