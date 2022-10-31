import CompressAction from "./compress.action";

type UploadImageForm = {
  image: File;
  isPublic: boolean;
  description: string;
  compressAction: CompressAction;
};

export default UploadImageForm;
