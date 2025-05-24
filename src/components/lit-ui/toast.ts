import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type ToastType = 'success' | 'error' | 'info' | 'warning';

@customElement('lit-toast')
export class LitToast extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1000;
    }

    .toast {
      min-width: 300px;
      padding: 1rem;
      margin: 0.5rem;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast.success {
      background-color: #22c55e;
      color: white;
    }

    .toast.error {
      background-color: #ef4444;
      color: white;
    }

    .toast.info {
      background-color: #3b82f6;
      color: white;
    }

    .toast.warning {
      background-color: #f59e0b;
      color: white;
    }

    .close-button {
      background: none;
      border: none;
      color: currentColor;
      cursor: pointer;
      padding: 0;
      margin-left: 1rem;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-button:hover {
      opacity: 1;
    }
  `;

  @property({ type: String }) message = '';
  @property({ type: String }) type: ToastType = 'info';
  @property({ type: Number }) duration = 3000;
  @property({ type: Boolean }) show = false;

  private timeout: number | null = null;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('show') && this.show) {
      this._startTimer();
    }
  }

  render() {
    if (!this.show) return null;

    return html`
      <div class="toast ${this.type}">
        <span>${this.message}</span>
        <button class="close-button" @click=${this._close}>×</button>
      </div>
    `;
  }

  private _startTimer() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this._close();
    }, this.duration);
  }

  private _close() {
    this.show = false;
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.dispatchEvent(new CustomEvent('toast-close'));
  }


  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }
} 