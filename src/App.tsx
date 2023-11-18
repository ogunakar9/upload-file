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

    if (inputFiles[inputFiles.length - 1].size > MAX_FILE_SIZE) {
      alert("File size is too big!");
      return;
    }
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
    let objectUrl: any = undefined;
    console.log("files", files);

    Array.from(files).forEach((file: File) => {
      // console.log("file", file);
      // console.log("type", typeof file);

      objectUrl = URL.createObjectURL(file);
      setPreview((prevState) => [...prevState!, objectUrl]);
    });

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
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
        preview.map((imgSrc) => <img key={imgSrc} src={imgSrc} alt="" />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
