import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface TabItem {
  id: string;
  label: string;
  content: string;
}

@customElement('lit-tabs')
export class LitTabs extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .tabs-container {
      border-bottom: 1px solid #e2e8f0;
    }

    .tabs-list {
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .tab-button {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      color: #64748b;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }

    .tab-button:hover {
      color: #334155;
    }

    .tab-button.active {
      color: #0f172a;
      border-bottom-color: #3b82f6;
    }

    .tab-content {
      padding: 1rem 0;
    }
  `;

  @property({ type: Array }) items: TabItem[] = [];
  @property({ type: String }) defaultValue = '';
  @state() private activeTab = '';

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('defaultValue') && this.defaultValue && !this.activeTab) {
      this.activeTab = this.defaultValue;
    } else if (changedProperties.has('items') && this.items.length > 0 && !this.activeTab) {
      this.activeTab = this.items[0].id;
    }
  }

  render() {
    return html`
      <div class="tabs-container">
        <ul class="tabs-list">
          ${this.items.map(
            (item) => html`
              <li>
                <button
                  class="tab-button ${item.id === this.activeTab ? 'active' : ''}"
                  @click=${() => this._selectTab(item.id)}
                >
                  ${item.label}
                </button>
              </li>
            `
          )}
        </ul>
      </div>
      <div class="tab-content">
        ${this.items.find((item) => item.id === this.activeTab)?.content}
      </div>
    `;
  }

  private _selectTab(tabId: string) {
    this.activeTab = tabId;
    this.dispatchEvent(
      new CustomEvent('tab-change', {
        detail: { tabId },
        bubbles: true,
        composed: true,
      })
    );
  }
} 