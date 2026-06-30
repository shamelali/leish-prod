import { useState, useCallback } from "react";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  custom?: (value: string) => string | undefined;
}

export interface FieldState {
  value: string;
  error: string | undefined;
  touched: boolean;
}

export function useFormValidation(fields: Record<string, ValidationRule>) {
  const [fieldStates, setFieldStates] = useState<Record<string, FieldState>>(
    Object.fromEntries(
      Object.keys(fields).map((key) => [
        key,
        { value: "", error: undefined, touched: false },
      ]),
    ),
  );

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      const rule = fields[name];
      if (!rule) return undefined;

      if (rule.required && !value.trim()) {
        return `${name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())} is required`;
      }
      if (rule.minLength && value.length < rule.minLength) {
        return `Must be at least ${rule.minLength} characters`;
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return `Must be at most ${rule.maxLength} characters`;
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.patternMessage || "Invalid format";
      }
      if (rule.custom) {
        return rule.custom(value);
      }
      return undefined;
    },
    [fields],
  );

  const setValue = useCallback(
    (name: string, value: string) => {
      setFieldStates((prev) => ({
        ...prev,
        [name]: {
          value,
          error: prev[name]?.touched ? validateField(name, value) : undefined,
          touched: prev[name]?.touched,
        },
      }));
    },
    [validateField],
  );

  const setTouched = useCallback(
    (name: string) => {
      setFieldStates((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          touched: true,
          error: validateField(name, prev[name]?.value || ""),
        },
      }));
    },
    [validateField],
  );

  const validateAll = useCallback((): boolean => {
    let valid = true;
    const updated = { ...fieldStates };
    for (const name of Object.keys(fields)) {
      const error = validateField(name, updated[name]?.value || "");
      updated[name] = { ...updated[name], touched: true, error };
      if (error) valid = false;
    }
    setFieldStates(updated);
    return valid;
  }, [fieldStates, fields, validateField]);

  const reset = useCallback(() => {
    setFieldStates(
      Object.fromEntries(
        Object.keys(fields).map((key) => [
          key,
          { value: "", error: undefined, touched: false },
        ]),
      ),
    );
  }, [fields]);

  const getValues = useCallback((): Record<string, string> => {
    return Object.fromEntries(
      Object.keys(fieldStates).map((key) => [
        key,
        fieldStates[key]?.value || "",
      ]),
    );
  }, [fieldStates]);

  const hasErrors = Object.values(fieldStates).some((f) => f.error);
  const allTouched = Object.values(fieldStates).every((f) => f.touched);

  return {
    fields: fieldStates,
    setValue,
    setTouched,
    validateAll,
    validateField,
    reset,
    getValues,
    hasErrors,
    allTouched,
  };
}

// Password strength calculator
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
  checks: { label: string; passed: boolean }[];
} {
  const checks = [
    { label: "At least 8 characters", passed: password.length >= 8 },
    { label: "Uppercase letter", passed: /[A-Z]/.test(password) },
    { label: "Lowercase letter", passed: /[a-z]/.test(password) },
    { label: "Number", passed: /\d/.test(password) },
    { label: "Special character", passed: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.passed).length;

  const levels = [
    { label: "Very Weak", color: "bg-red-500" },
    { label: "Weak", color: "bg-orange-500" },
    { label: "Fair", color: "bg-yellow-500" },
    { label: "Good", color: "bg-green-400" },
    { label: "Strong", color: "bg-green-600" },
    { label: "Very Strong", color: "bg-emerald-600" },
  ];

  return { score, ...levels[score], checks };
}
