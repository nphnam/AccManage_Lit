'use client'
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-modal')
export class LitModal extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: relative;
      max-width: 500px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      font-size: 1.5rem;
      color: #666;
    }

    .close-button:hover {
      color: #333;
    }

    .modal-content {
      margin-bottom: 16px;
    }

    .hidden {
      display: none;
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = '';

  render() {
    return html`
      <div class="modal-overlay ${!this.open ? 'hidden' : ''}" @click=${this._handleOverlayClick}>
        <div class="modal-container" @click=${this._stopPropagation}>
          <div class="modal-header">
            <h2 class="modal-title">${this.title}</h2>
            <button class="close-button" @click=${this._handleClose}>×</button>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _handleOverlayClick(e: Event) {
    this._handleClose();
  }

  private _stopPropagation(e: Event) {
    e.stopPropagation();
  }

  private _handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', { 
      bubbles: true, 
      composed: true,
      detail: { open: false } 
    }));
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = '';
  }
} 