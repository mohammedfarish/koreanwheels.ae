import React, { ComponentProps as ExtractProps } from "react";

import { twMerge } from "tailwind-merge";
import Select from "react-select";
import AsyncSelect from "react-select/async";
// import {
//   Datepicker,
//   DatepickerProps as DatePickerPropsType,
// } from "flowbite-react";

// import { datePicker } from "@/utils/flowbite/themes";
// import { Button, ButtonProps } from "../ui/button";
// import { Input as CustomInput } from "@/components/ui/input";
// import { Textarea } from "../ui/textarea";

// import { datePicker } from "../../utils/themes";

function Label({ label, required }: { label: string; required: boolean }) {
  return (
    <div className="flex">
      <label className="font-bold text-sm pb-2">{label}</label>
      {required && (
        <span
          title="Required"
          className="text-red-500 ml-1 -mt-1 text-lg cursor-pointer select-none pr-5"
        >
          {" "}
          *
        </span>
      )}
    </div>
  );
}

export type Option = {
  label: string;
  value: any;
} & Record<string, any>;

type Component<Type, Props> = { type: Type } & Props;

type SelectProps = ExtractProps<typeof Select<Option, boolean>>;
type AsyncSelectProps = ExtractProps<typeof AsyncSelect<Option, boolean>>;

type InputComponentProps = CommonProps &
  Component<
    "text" | "email" | "password",
    React.InputHTMLAttributes<HTMLInputElement>
  >;

// type DatePickerProps = DatePickerPropsType & {
//   onChange?: (date: Date) => void;
// };

type CommonProps = {
  label?: string;
  className?: string;
  disabled?: boolean;
  internalClassName?: string;
  min?: any;
  max?: any;
  onChange?: (e: any) => void;
  required?: boolean;
};

type Props =
  //   | (CommonProps &      Component<"date", DatePickerProps & { min?: Date; max?: Date }>)
  | (CommonProps & Component<"select", SelectProps>)
  | (CommonProps & Component<"asyncselect", AsyncSelectProps>)
  | (CommonProps & InputComponentProps)
  | (CommonProps & Component<"textarea", ExtractProps<"textarea">>)
  | (CommonProps & Component<"file", ExtractProps<"input">>)
  | (CommonProps & Component<"submit" | "button", ExtractProps<"input">>);
// (CommonProps & Component<TYPE, ExtractProps<COMPONENT>>)

function Input(props: Props) {
  const {
    type,
    label,
    className,
    disabled,
    internalClassName,
    required,
    min,
    max,
    onChange,
  } = props;

  const isRequired = required || false;
  const sectionClassName = twMerge("flex flex-col w-full text-sm", className);

  if (type === "select") {
    return (
      <div className={twMerge(sectionClassName, "remove-input-txt-border")}>
        {label && <Label label={label} required={isRequired} />}

        <Select
          className="w-full xs:w-full outline-none p-0"
          onChange={onChange}
          isDisabled={disabled}
          {...props}
        />
      </div>
    );
  }

  if (type === "asyncselect") {
    return (
      <div className={twMerge(sectionClassName, "remove-input-txt-border")}>
        {label && <Label label={label} required={isRequired} />}

        <AsyncSelect
          className="w-full xs:w-full"
          isDisabled={disabled}
          noOptionsMessage={() => "No options"}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }

  if (type === "text" || type === "email" || type === "password") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}

        <input
          //   type={type}
          className={twMerge(
            internalClassName,
            "border border-gray-300 rounded-lg p-2 disabled:opacity-75"
          )}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}

        <input
          className={twMerge(internalClassName, "rounded bg-white")}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}
        <textarea
          className="w-full xs:w-full p-2 border-2 border-gray-200 focus:border-org-color-3 duration-200 outline-none rounded-lg resize-none disabled:opacity-75"
          rows={3}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }

  if (type === "submit" || type === "button") {
    return (
      <div className={sectionClassName}>
        <input
          className="bg-black text-white font-bold cursor-pointer hover:bg-opacity-75 duration-200 rounded-lg p-2 disabled:opacity-75"
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }

  //   if (type === "date") {
  //     return (
  //       <div className={sectionClassName}>
  //         {label && <Label label={label} required={isRequired} />}

  //         <Datepicker
  //           theme={datePicker}
  //           className="w-full rounded-md text-sm outline-none focus:border-org-color-3 disabled:bg-org-color-3 duration-200"
  //           onSelectedDateChanged={onChange}
  //           minDate={min}
  //           maxDate={max}
  //           disabled={disabled}
  //           weekStart={1}
  //           {...props}
  //           type={undefined}
  //         />
  //       </div>
  //     );
  //   }

  return (
    <div className={sectionClassName}>
      {label && <Label label={label} required={isRequired} />}

      <input
        className={twMerge(
          "w-full xs:w-full p-2 border-2 border-gray-200 focus:border-org-color-3 duration-200 outline-none rounded-lg",
          internalClassName
        )}
        disabled={disabled}
        onChange={onChange}
        {...(props as InputComponentProps)}
      />
    </div>
  );
}

export default Input;
