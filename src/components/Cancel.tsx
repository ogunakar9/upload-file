import { useAppSelector } from "../app/hooks";
import { isCanceledState } from "../features/upload/uploadSlice";

const Cancel = (props: ICancelProps) => {
  const isCanceled = useAppSelector(isCanceledState);
  const { uploadXHR } = props;

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
  uploadXHR: XMLHttpRequest | null;
}
