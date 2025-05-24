import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-spinner')
export class LitSpinner extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .spinner {
      width: var(--spinner-size, 2rem);
      height: var(--spinner-size, 2rem);
      border: var(--spinner-border-width, 2px) solid var(--spinner-color, #e2e8f0);
      border-top-color: var(--spinner-accent-color, #3b82f6);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .spinner-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({ type: Boolean }) overlay = false;
  @property({ type: String }) size = '2rem';
  @property({ type: String }) color = '#e2e8f0';
  @property({ type: String }) accentColor = '#3b82f6';
  @property({ type: String }) borderWidth = '2px';

  render() {
    const spinner = html`
      <div
        class="spinner"
        style="
          --spinner-size: ${this.size};
          --spinner-color: ${this.color};
          --spinner-accent-color: ${this.accentColor};
          --spinner-border-width: ${this.borderWidth};
        "
      ></div>
    `;

    return this.overlay
      ? html`<div class="spinner-overlay">${spinner}</div>`
      : spinner;
  }
} 