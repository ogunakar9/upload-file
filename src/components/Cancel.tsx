const Cancel = (props: ICancelProps) => {
  const { isCanceled, uploadXHR } = props;

  return (
    <>
      {isCanceled && !uploadXHR ? (
        <span className="text-yellow-500">
          you canceled the upload request!
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cancel;

interface ICancelProps {
  isCanceled: boolean;
  uploadXHR: XMLHttpRequest | null;
}
