const validateFileSize = (files: File[], maxFileSize: number) => {
  let sizeError = false;
  for (const file of files) {
    if (file.size > maxFileSize) {
      alert("File size is too big!");
      sizeError = true;
      break;
    }
  }

  return sizeError;
};

export { validateFileSize };
