import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { POST_URL } from "./features/upload/uploadAPI";

const App = () => {
  const MAX_FILE_SIZE = 50000;
  const [files, setFiles] = useState<FileList | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files[files.length - 1].size > MAX_FILE_SIZE) {
      alert("Please upload only one file");
      return;
    }
    setFiles(files);
  };

  useEffect(() => {
    if (files && files.length) {
      const formData = new FormData();
      console.log(files[0]);

      formData.append("file", files[0]);
      console.log(formData);

      // fetch(POST_URL, {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((res) => res.json())
      //   .then((res) => console.log(res));
    }
  }, [files]);

  return (
    <div className="App">
      <h1
        className="text-3xl font-bold
        underline"
      >
        Hello world!
      </h1>
      <input type="file" onChange={handleInputChange} />
      {files &&
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
        })}
    </div>
  );
};

export default App;
