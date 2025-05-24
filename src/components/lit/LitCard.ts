import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-card')
export class LitCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: white;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      overflow: hidden;
      border-radius: 12px;
    }

    .card.hoverable {
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .card.hoverable:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .card-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .card-footer {
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
    }

    /* Variants */
    .card.bordered {
      border: 1px solid #e5e7eb;
      box-shadow: none;
    }

    .card.flat {
      box-shadow: none;
      border: none;
      background-color: #f9fafb;
    }
  `;

  @property({ type: Boolean })
  hoverable = false;

  @property({ type: String })
  className = '';

  @property({ type: String })
  variant: 'default' | 'bordered' | 'flat' = 'default';

  render() {
    return html`
      <div class="card ${this.variant} ${this.hoverable ? 'hoverable' : ''} ${this.className}">
        <div class="card-header">
          <slot name="header"></slot>
        </div>
        <div class="card-content">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-card': LitCard;
  }
} 