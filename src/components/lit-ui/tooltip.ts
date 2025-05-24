import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-tooltip')
export class LitTooltip extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    .tooltip {
      position: absolute;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 14px;
      white-space: nowrap;
      z-index: 1000;
      pointer-events: none;
      transition: opacity 0.2s;
      opacity: 0;
    }

    .tooltip.show {
      opacity: 1;
    }

    /* Positions */
    .tooltip.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
    }

    .tooltip.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
    }

    .tooltip.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(-8px);
    }

    .tooltip.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) translateX(8px);
    }
  `;

  @property({ type: String }) content = '';
  @property({ type: String }) position = 'top';
  @property({ type: Boolean }) show = false;

  render() {
    return html`
      <div
        @mouseenter=${this._showTooltip}
        @mouseleave=${this._hideTooltip}
        @focus=${this._showTooltip}
        @blur=${this._hideTooltip}
      >
        <slot></slot>
        <div class="tooltip ${this.position} ${this.show ? 'show' : ''}">
          ${this.content}
        </div>
      </div>
    `;
  }

  private _showTooltip() {
    this.show = true;
  }

  private _hideTooltip() {
    this.show = false;
  }
} 