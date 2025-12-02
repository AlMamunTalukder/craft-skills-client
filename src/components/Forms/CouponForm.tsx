"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Coupon } from "@prisma/client";
import { couponSchema, CouponFormData } from "@/schemas/coupon";
import { createCoupon, updateCoupon } from "@/queries/coupon";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppForm from "@/components/Forms/AppForm";
import TextInput from "@/components/FormInputs/TextInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import PickDate from "@/components/FormInputs/PickDate";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { Loader2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const discountTypeOptions = [
  { label: "Percentage", value: "PERCENTAGE" },
  { label: "Amount", value: "AMOUNT" },
];

type Props = {
  initialValues?: Coupon;
  loading?: boolean;
};

export default function CouponForm({ initialValues, loading = false }: Props) {
  const router = useRouter();

  const onSubmit = async (data: CouponFormData) => {
    const toastId = toast.loading("Saving coupon...");
    try {
      if (initialValues?.id) {
        await updateCoupon(initialValues.id, data);
        toast.success("Coupon updated", { id: toastId });
      } else {
        await createCoupon(data);
        toast.success("Coupon created", { id: toastId });
      }
      router.push("/dashboard/coupons/list");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>
          {initialValues ? "Update Coupon" : "Create Coupon"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AppForm
          resolver={zodResolver(couponSchema)}
          onSubmit={onSubmit}
          defaultValues={{
            ...initialValues,
            discountType: {
              label: initialValues?.discountType || "PERCENTAGE",
              value: initialValues?.discountType || "PERCENTAGE",
            },
          }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              <TextInput label="Coupon Code" name="code" />
              <FormSelectInput
                label="Discount Type"
                name="discountType"
                options={discountTypeOptions}
              />
              <TextInput label="Discount" name="discount" type="number" />
              <TextInput label="Max Usage" name="maxUsage" type="number" />
              <PickDate label="Valid From" name="validFrom" />
              <PickDate label="Valid To" name="validTo" />
            </div>
            <div className="flex items-center gap-4">
              <SubmitButton
                title={initialValues ? "Update" : "Create"}
                loadingTitle="Saving..."
                loading={loading}
                className="px-6"
                loaderIcon={Loader2}
              />
            </div>
          </div>
        </AppForm>
      </CardContent>
    </Card>
  );
}
