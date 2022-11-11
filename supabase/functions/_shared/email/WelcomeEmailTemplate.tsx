/** @jsx h */
/** @jsxFrag Fragment */
import { h, Component } from "https://deno.land/x/jsx@v0.1.5/mod.ts";

type Props = {
  name: string;
};
const WelcomeEmailTemplate: Component<Props> = (props) => {
  const { name } = props;
  return <h1>This is a Welcome Email Template, Hello {name}</h1>;
};

export default WelcomeEmailTemplate;
