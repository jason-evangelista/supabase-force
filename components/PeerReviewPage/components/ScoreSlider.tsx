import { Slider, SliderProps, Box, Text } from "@mantine/core";
import { forwardRef } from "react";
import MARKS from "../utils/marks";

type PropsRef = SliderProps &
  React.RefAttributes<HTMLDivElement> & {
    error?: string;
  };

const ScoreSlider = forwardRef<HTMLDivElement, PropsRef>((props, ref) => {
  const { error, ...rest } = props;
  return (
    <Box>
      <Slider ref={ref} marks={MARKS} max={5} min={0} mb="md" {...rest} />
      {error && (
        <Text size="xs" color="red">
          {error}
        </Text>
      )}
    </Box>
  );
});

ScoreSlider.displayName = "ScoreSlider";

export default ScoreSlider;
