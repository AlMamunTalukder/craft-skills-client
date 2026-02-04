/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit?: SubmitHandler<FieldValues | any>;
  children: ReactNode;
} & TFormConfig;

const AppForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("📤 Form submission started in AppForm");
    // console.log("Data:", data);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
        // console.log("✅ Form submission successful in AppForm");
      }
    } catch (error: any) {
      // console.error("❌ Form submission error in AppForm:", error);
      throw error;
    }
  };

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(submit)} 
        className="space-y-4"
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default AppForm;