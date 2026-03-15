/* React 18/19 type compatibility shim for @kaze-ds/react */
declare module "@kaze-ds/react" {
  import { FC, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, RefObject, ReactNode } from "react";

  // Button
  export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
  export type ButtonSize = "xs" | "sm" | "md" | "lg";
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    iconOnly?: boolean;
  }
  export const Button: FC<ButtonProps>;

  // Card
  export type CardVariant = "default" | "interactive" | "compact" | "fill";
  export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
  }
  export const Card: FC<CardProps>;
  export const CardHeader: FC<HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>>;
  export const CardBody: FC<HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: FC<HTMLAttributes<HTMLDivElement>>;

  // Badge
  export type BadgeVariant = "default" | "positive" | "negative" | "warning" | "info";
  export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    dot?: boolean;
    solid?: boolean;
    live?: boolean;
  }
  export const Badge: FC<BadgeProps>;

  // Input
  export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
  }
  export const Input: FC<InputProps>;

  // Textarea
  export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
  }
  export const Textarea: FC<TextareaProps>;

  // FormField
  export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    description?: string;
    error?: string;
    counter?: string;
  }
  export const FormField: FC<FormFieldProps>;

  // Heading
  export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    bordered?: boolean;
  }
  export const Heading: FC<HeadingProps>;

  // Text
  export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    as?: string;
  }
  export const Text: FC<TextProps>;

  // Divider
  export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    subtle?: boolean;
  }
  export const Divider: FC<DividerProps>;

  // EmptyState
  export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    title: string;
    description?: string;
    actions?: ReactNode;
  }
  export const EmptyState: FC<EmptyStateProps>;

  // List
  export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    variant?: "disc" | "decimal" | "divided";
  }
  export const List: FC<ListProps>;

  export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {}
  export const ListItem: FC<ListItemProps>;

  // Tabs
  export interface TabGroupProps extends HTMLAttributes<HTMLDivElement> {}
  export const TabGroup: FC<TabGroupProps>;

  export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "pills";
  }
  export const Tabs: FC<TabsProps>;

  export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    value?: string;
  }
  export const Tab: FC<TabProps>;

  export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    selected?: string;
  }
  export const TabPanel: FC<TabPanelProps>;

  // Dialog
  export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean;
    onClose: () => void;
  }
  export const Dialog: FC<DialogProps>;
  export const DialogHeader: FC<HTMLAttributes<HTMLDivElement>>;
  export const DialogTitle: FC<HTMLAttributes<HTMLHeadingElement>>;
  export const DialogBody: FC<HTMLAttributes<HTMLDivElement>>;
  export const DialogFooter: FC<HTMLAttributes<HTMLDivElement>>;

  // Select
  export const Select: FC<HTMLAttributes<HTMLSelectElement> & { error?: boolean }>;

  // FAB
  export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    extended?: boolean;
  }
  export const FAB: FC<FABProps>;

  // Alert
  export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "info" | "positive" | "warning" | "negative";
  }
  export const Alert: FC<AlertProps>;

  // ThemeProvider (also re-exported from main)
  export type Theme = "light" | "dark" | "system";
  export interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
  }
  export const ThemeProvider: FC<ThemeProviderProps>;
  export function useTheme(): {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
  };
}

declare module "@kaze-ds/react/hooks" {
  import { FC, ReactNode } from "react";

  export type Theme = "light" | "dark" | "system";
  export interface ThemeContextValue {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
  }
  export interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
  }
  export const ThemeProvider: FC<ThemeProviderProps>;
  export function useTheme(): ThemeContextValue;
  export function useFocusTrap(ref: React.RefObject<HTMLElement>, active: boolean): void;
}
