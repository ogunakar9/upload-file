import "./App.css";
import FileUploader from "./FileUploader";

const App = () => {
  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const inputFiles = e.target.files;
  //   if (!inputFiles) return;

  //   const filesArray = Array.from(inputFiles);

  //   let sizeError = false;
  //   for (const file of filesArray) {
  //     if (file.size > MAX_FILE_SIZE) {
  //       alert("File size is too big!");
  //       sizeError = true;
  //       break;
  //     }
  //   }

  //   if (sizeError) return;
  //   setFiles(inputFiles);

  //   const formData = new FormData();

  //   // console.log("inputFiles", inputFiles);

  //   for (const file in inputFiles) {
  //     formData.append("file", file);
  //   }

  //   // console.log("xx", formData.get("file"));
  // };

  return (
    <div className="App">
      <h1
        className="text-3xl font-bold
        underline"
      >
        Hello world!
      </h1>

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

      <FileUploader />
    </div>
  );
};

export default App;

// method="post" enctype="multipart/form-data"
