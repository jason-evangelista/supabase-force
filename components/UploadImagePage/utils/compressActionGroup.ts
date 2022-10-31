import CompressAction from "../type/compress.action";

export type CompressActionGroup = {
  label: string;
  value: CompressAction;
};

const compressActionGroup: CompressActionGroup[] = [
  {
    label: "No compression",
    value: "no-compression",
  },
  {
    label: "Supabase server compression",
    value: "supabase-server-compression",
  },
  {
    label: "Client-side compression",
    value: "client-side-compression",
  },
];

export default compressActionGroup;
