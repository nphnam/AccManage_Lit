import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-button')
export class LitButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    
    button {
      font-family: system-ui, sans-serif;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      outline: none;
    }

    /* Variants */
    button.primary {
      background-color: #3b82f6;
      color: white;
    }

    button.primary:hover {
      background-color: #2563eb;
    }

    button.secondary {
      background-color: #9ca3af;
      color: white;
    }

    button.secondary:hover {
      background-color: #6b7280;
    }

    button.outline {
      background-color: transparent;
      border: 1px solid #3b82f6;
      color: #3b82f6;
    }

    button.outline:hover {
      background-color: #3b82f6;
      color: white;
    }

    /* Sizes */
    button.small {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }

    button.large {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
    }

    /* Disabled state */
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: String })
  variant: 'primary' | 'secondary' | 'outline' = 'primary';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean })
  disabled = false;

  render() {
    return html`
      <button
        class="${this.variant} ${this.size}"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private _handleClick(e: Event) {
    this.dispatchEvent(new CustomEvent('lit-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
} 