/** @jsx h */
/** @jsxFrag Fragment */
import {
  h,
  renderToString,
  Fragment,
  Component,
  Node,
} from "https://deno.land/x/jsx@v0.1.5/mod.ts";
import RequestApprovalEmailTemplate from "./RequestApprovalEmailTemplate.tsx";

import WelcomeEmailTemplate from "./WelcomeEmailTemplate.tsx";

type PropsBodyContent = {
  type: string;
  params: Record<string, string | number>;
};

type PropsEmailTemplate = {
  children: Node[];
};

const EmailTemplate: Component<PropsEmailTemplate> = (props) => {
  const { children } = props;

  return (
    <body
      style="
      background-color: #f8fdfb;
      overflow: hidden;
      padding: 120px 75px;
      text-align: center;
    "
    >
      <section
        style="
        background-color: #ffffff;
        padding: 45px 60px;
        margin-top: 60px;
        border-radius: 15px;
        text-align: center;
        width: 700px;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
      "
      >
        {children}
      </section>
    </body>
  );
};

const bodyContent = async (props: PropsBodyContent) => {
  const { params, type } = props;
  const isRequestApproval = type === "request_approval";
  const isWelcome = type === "welcome";

  const content = await renderToString(
    <>
      <EmailTemplate>
        {isWelcome && <WelcomeEmailTemplate name={params.name.toString()} />}
        {isRequestApproval && <RequestApprovalEmailTemplate />}
      </EmailTemplate>
    </>
  );

  return content;
};

export default bodyContent;
