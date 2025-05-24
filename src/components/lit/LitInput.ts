import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-input')
export class LitInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .input-container {
      position: relative;
      width: 100%;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    input {
      width: 100%;
      border: 1px solid #d1d5db;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      box-sizing: border-box;
      font-size: 1rem;
      line-height: 1.5;
      color: #1f2937;
      background-color: white;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    input:disabled {
      background-color: #f3f4f6;
      cursor: not-allowed;
    }

    .error input {
      border-color: #ef4444;
    }

    .error-message {
      margin-top: 0.5rem;
      color: #ef4444;
      font-size: 0.875rem;
    }

    .helper-text {
      margin-top: 0.5rem;
      color: #6b7280;
      font-size: 0.875rem;
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  type: 'text' | 'password' | 'email' | 'number' = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  className = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  error = '';

  @property({ type: String })
  helperText = '';

  render() {
    return html`
      <div class="input-container ${this.error ? 'error' : ''}">
        ${this.label ? html`<label>${this.label}</label>` : ''}
        <input
          class=${this.className}
          type=${this.type}
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          @input=${this._handleInput}
          @change=${this._handleChange}
        />
        ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}
        ${this.helperText && !this.error ? html`<div class="helper-text">${this.helperText}</div>` : ''}
      </div>
    `;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('lit-input', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('lit-change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-input': LitInput;
  }
} 