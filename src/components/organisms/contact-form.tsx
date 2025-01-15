import { FormProvider, useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";

import { TextFormField } from "@/components/atoms/fields/text";
import { NumericFormField } from "@/components/atoms/fields/numeric";
import { Button } from "@/components/atoms/button";
import { PhoneFormField } from "@/components/atoms/fields/phone";

interface IContactForm {
  onSubmit: (values: IContactPayload) => void;
}

export interface IContactPayload {
  name: string;
  email: string;
  phone: number;
}
export function ContactForm({ onSubmit }: IContactForm) {
  const formController = useForm<IContactPayload>();

  const locale = useLocale();

  const t = useTranslations("ContactForm");
  const getFieldMainProps = (fieldName: keyof IContactPayload) => {
    return {
      id: fieldName,
      field: fieldName,
      label: t(`fields.${fieldName}.label`),
      options: { required: t(`fields.${fieldName}.errorMessage`) },
    };
  };

  return (
    <div className="flex flex-col p-6 md:p-4 w-4/5 sm:w-3/4 md:w-2/3 xl:w-1/3 h-full text-dark-1">
      <h1 className="text-xl md:text-4xl">{t("title")}</h1>
      <FormProvider {...formController}>
        <form
          className="flex flex-col gap-16 mt-10"
          onSubmit={onSubmit && formController.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5">
            <TextFormField<IContactPayload> {...getFieldMainProps("name")} />
            <TextFormField<IContactPayload> {...getFieldMainProps("email")} />
            <PhoneFormField<IContactPayload>
              {...getFieldMainProps("phone")}
              defaultCountry="br"
            />
          </div>
          <Button
            kind="secondary"
            label={t("submitButton")}
            type="submit"
            size="large"
          />
        </form>
      </FormProvider>
    </div>
  );
}
