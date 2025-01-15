"use client";

import React, { Suspense } from "react";

import { IEmailData } from "@/app/api/email-sender/types";

import ModalNotification, {
  NotificationTypes,
} from "@/components/molecules/modal/notification";

import {
  ContactForm,
  IContactPayload,
} from "@/components/organisms/contact-form";
import { buildEmailHtmlContent } from "./helper";

function PageOne() {
  const [sendingResult, setSendingResult] = React.useState<NotificationTypes>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const onSubmit = (contactPayload: IContactPayload) => {
    const emailPayload: IEmailData = {
      htmlContent: buildEmailHtmlContent(contactPayload),
      subject: `subject`,
    };

    fetch("/api/email-sender/send", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(emailPayload),
    })
      .then((res) => {
        if (res.status == 200) {
          setSendingResult("SUCCESS");
          setOpenModal(true);
        } else {
          throw Error();
        }
      })
      .catch(() => {
        setSendingResult("ERROR");
        setOpenModal(true);
      });
  };

  return (
    <div className="min-h-screen h-fit w-full flex justify-center bg-light-1 py-32">
      <ContactForm onSubmit={onSubmit} />
      <ModalNotification
        notificationType={sendingResult}
        open={openModal}
        setOpen={setOpenModal}
        title={
          sendingResult === "SUCCESS"
            ? "Enviado com sucesso!"
            : "Houve um falha no envio."
        }
        subtitle={
          sendingResult === "SUCCESS"
            ? "Entraremos em contato muito em breve."
            : "Entre em contato conosco através do email ou tente novamente"
        }
      />
    </div>
  );
}

export default function SuspenseWrapper() {
  return (
    <Suspense>
      <PageOne />
    </Suspense>
  );
}
