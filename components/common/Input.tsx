import React, { ComponentProps as ExtractProps } from "react";

import { twMerge } from "tailwind-merge";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import type { StylesConfig } from "react-select";

// Preline theme colours for react-select – uses CSS variables for theme adaptation
const selectThemeStyles: StylesConfig<Option, boolean> = {
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "var(--color-primary)" : "var(--color-border)",
    backgroundColor: "var(--color-layer)",
    boxShadow: state.isFocused ? "0 0 0 2px var(--color-primary)" : undefined,
    "&:hover": {
      borderColor: state.isFocused ? "var(--color-primary)" : "var(--color-border)",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    backgroundColor: "var(--color-select)",
    border: "1px solid var(--color-select-line)",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  }),
  menuList: (base) => ({
    ...base,
    padding: "0.25rem",
    borderRadius: "0.5rem",
  }),
  option: (base, state) => ({
    ...base,
    borderRadius: "0.375rem",
    color: "var(--color-select-item-foreground)",
    backgroundColor: state.isFocused ? "var(--color-select-item-focus)" : state.isSelected ? "var(--color-select-item-active)" : "transparent",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--color-select-item-active)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--color-layer-foreground)",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-muted-foreground)",
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-layer-foreground)",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-layer-foreground)",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "var(--color-muted-foreground)",
    "&:hover": {
      color: "var(--color-layer-foreground)",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};
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
      <label className="mb-2 block text-sm font-medium text-layer-foreground">{label}</label>
      {required && (
        <span title="Required" className="ml-1 -mt-1 text-lg cursor-pointer select-none text-red-500">
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

type InputComponentProps = CommonProps & Component<"text" | "email" | "password" | "tel", React.InputHTMLAttributes<HTMLInputElement>>;

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
  const { type, label, className, disabled, internalClassName, required, min, max, onChange } = props;

  const isRequired = required || false;
  const sectionClassName = twMerge("flex flex-col w-full text-sm", className);

  if (type === "select") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}

        <Select
          className="w-full xs:w-full outline-none p-0"
          styles={selectThemeStyles}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          menuPosition="fixed"
          onChange={onChange}
          isDisabled={disabled}
          {...props}
        />
      </div>
    );
  }

  if (type === "asyncselect") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}

        <AsyncSelect
          className="w-full xs:w-full"
          styles={selectThemeStyles}
          menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
          menuPosition="fixed"
          isDisabled={disabled}
          noOptionsMessage={() => "No options"}
          onChange={onChange}
          {...props}
        />
      </div>
    );
  }

  if (type === "text" || type === "email" || type === "password" || type === "tel") {
    return (
      <div className={sectionClassName}>
        {label && <Label label={label} required={isRequired} />}

        <input
          className={twMerge(
            internalClassName,
            "block w-full rounded-lg border border-border bg-layer px-3 py-2 text-sm text-layer-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
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
          className={twMerge(
            internalClassName,
            "block w-full rounded-lg border border-border px-3 py-2 text-sm file:border-0 file:bg-muted file:mr-4 file:px-4 file:py-2 file:text-sm file:font-medium file:text-layer-foreground disabled:pointer-events-none disabled:opacity-50"
          )}
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
          className="block w-full rounded-lg border border-border bg-layer px-3 py-2 text-sm text-layer-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50"
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
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
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
          "block w-full rounded-lg border border-border bg-layer px-3 py-2 text-sm text-layer-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50",
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
