const Progress = (uploadProgress: any) => {
  return (
    <>
      {uploadProgress.length ? (
        <div className="my-4">
          <h4 className="text-lg font-semibold">Upload Progress:</h4>
          <ul>
            {uploadProgress.map((progress: number, index: number) => (
              <li key={index}>{`File ${index + 1}: ${progress.toFixed(
                2,
              )}%`}</li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Progress;
