import { TextInput } from "@mantine/core";
import { FC, FormEvent } from "react";

type Props = {
  handleKeywordAnalysis: (e: FormEvent<HTMLFormElement>) => void;
};

const KeywordAnalysisForm: FC<Props> = (props) => {
  const { handleKeywordAnalysis } = props;
  return (
    <form onSubmit={handleKeywordAnalysis}>
      <TextInput
        placeholder="Search keyword"
        type="text"
        my="md"
        name="searchQuery"
      />
    </form>
  );
};

export default KeywordAnalysisForm;
