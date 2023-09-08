import { useStoreState, useStoreActions } from "easy-peasy";
export default function useFiles() {
  const fetchFiles = useStoreActions((actions) => actions.files.fetchFiles);
  const fetchFile = useStoreActions((actions) => actions.files.fetchFile);
  const fileData = useStoreState((state) => state.files);
  const createFile = useStoreActions((actions) => actions.files.createFile);

  return {
    fetchFiles,
    fetchFile,
    createFile,
    fileData,
  };
}
