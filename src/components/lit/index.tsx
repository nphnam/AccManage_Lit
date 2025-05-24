import * as React from 'react';
import { createComponent } from '@lit/react';
import { LitButton } from './LitButton';
import { LitInput } from './LitInput';
import { LitCard } from './LitCard';

export const Button = createComponent({
  tagName: 'lit-button',
  elementClass: LitButton,
  react: React,
  events: {
    onLitClick: 'lit-click',
  },
  
});

export const Input = createComponent({
  tagName: 'lit-input',
  elementClass: LitInput,
  react: React,
  events: {
    onLitInput: 'lit-input',
    onLitChange: 'lit-change',
  },
});

export const Card = createComponent({
  tagName: 'lit-card',
  elementClass: LitCard,
  react: React,
});

// Type definitions for better TypeScript support
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onLitClick?: (e: CustomEvent<{ originalEvent: Event }>) => void;
  children?: React.ReactNode;
}

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  onLitInput?: (e: CustomEvent<{ value: string }>) => void;
  onLitChange?: (e: CustomEvent<{ value: string }>) => void;
}

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  hoverable?: boolean;
  variant?: 'default' | 'bordered' | 'flat';
  children?: React.ReactNode;
} 