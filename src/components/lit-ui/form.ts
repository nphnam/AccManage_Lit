import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea';
  required?: boolean;
  placeholder?: string;
  value?: string;
  error?: string;
}

@customElement('lit-form')
export class LitForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .error input,
    .error textarea {
      border-color: #ef4444;
    }

    .error-message {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #ef4444;
    }

    .required {
      color: #ef4444;
      margin-left: 0.25rem;
    }

    button[type="submit"] {
      background-color: #3b82f6;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button[type="submit"]:hover {
      background-color: #2563eb;
    }

    button[type="submit"]:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }
  `;

  @property({ type: Array }) fields: FormField[] = [];
  @property({ type: Boolean }) loading = false;

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        ${this.fields.map(
          (field) => html`
            <div class="form-group ${field.error ? 'error' : ''}">
              <label>
                ${field.label}
                ${field.required
                  ? html`<span class="required">*</span>`
                  : null}
              </label>
              ${field.type === 'textarea'
                ? html`
                    <textarea
                      name=${field.name}
                      .value=${field.value || ''}
                      placeholder=${field.placeholder || ''}
                      ?required=${field.required}
                      @input=${(e: Event) =>
                        this._handleInput(field.name, e)}
                    ></textarea>
                  `
                : html`
                    <input
                      type=${field.type}
                      name=${field.name}
                      .value=${field.value || ''}
                      placeholder=${field.placeholder || ''}
                      ?required=${field.required}
                      @input=${(e: Event) =>
                        this._handleInput(field.name, e)}
                    />
                  `}
              ${field.error
                ? html`<div class="error-message">${field.error}</div>`
                : null}
            </div>
          `
        )}
        <button type="submit" ?disabled=${this.loading}>
          ${this.loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    `;
  }

  private _handleInput(fieldName: string, event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent('form-input', {
        detail: { fieldName, value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    this.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }
} 