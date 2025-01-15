import * as ReactDOMServer from "react-dom/server";

import { IContactPayload } from "@/components/organisms/solutions/common/contact-form";

export interface IFormItem {
  question: string;
  answer: string | number;
}

export function FormItem({ question, answer }: IFormItem) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontWeight: 600, marginBottom: "5px" }}>{question}:</div>
      <div>{answer}</div>
    </div>
  );
}

function EmailContentAsReactNode(contactPayload: IContactPayload) {
  const formItemsIndexer: Array<IFormItem> = [
    {
      question: "Responsável Legal",
      answer: contactPayload.legalRepresentative,
    },
    {
      question: "Razão Social",
      answer: contactPayload.companyName,
    },
    {
      question: "CNPJ",
      answer: contactPayload.cnpj,
    },
    {
      question: "Email",
      answer: contactPayload.email,
    },
    {
      question: "Telefone",
      answer: contactPayload.phone,
    },
    {
      question: "Valor de Empréstimo/Investimento",
      answer: contactPayload.loanAmount,
    },
  ];

  return (
    <div>
      {formItemsIndexer.map((formItem) => (
        <FormItem key={`form-item-${formItem.question}`} {...formItem} />
      ))}
    </div>
  );
}

export function buildEmailHtmlContent(contactPayload: IContactPayload) {
  const emailContentAsReactNode = EmailContentAsReactNode(contactPayload);
  return ReactDOMServer.renderToString(emailContentAsReactNode);
}
