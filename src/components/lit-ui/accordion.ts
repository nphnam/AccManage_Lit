import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@customElement('lit-accordion')
export class LitAccordion extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .accordion-item {
      border-bottom: 1px solid #e2e8f0;
    }

    .accordion-item:last-child {
      border-bottom: none;
    }

    .accordion-header {
      padding: 1rem;
      background: white;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    .accordion-header:hover {
      background: #f8fafc;
    }

    .accordion-content {
      padding: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease-out;
    }

    .accordion-content.expanded {
      padding: 1rem;
      max-height: 500px;
    }

    .chevron {
      transition: transform 0.3s;
    }

    .chevron.expanded {
      transform: rotate(180deg);
    }
  `;

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Array }) expandedItems: string[] = [];

  render() {
    return html`
      ${this.items.map(
        (item) => html`
          <div class="accordion-item">
            <div
              class="accordion-header"
              @click=${() => this._toggleItem(item.id)}
            >
              <span>${item.title}</span>
              <span class="chevron ${this._isExpanded(item.id) ? 'expanded' : ''}">
                ▼
              </span>
            </div>
            <div
              class="accordion-content ${this._isExpanded(item.id)
                ? 'expanded'
                : ''}"
            >
              ${item.content}
            </div>
          </div>
        `
      )}
    `;
  }

  private _isExpanded(itemId: string): boolean {
    return this.expandedItems.includes(itemId);
  }

  private _toggleItem(itemId: string) {
    const isExpanded = this._isExpanded(itemId);
    if (isExpanded) {
      this.expandedItems = this.expandedItems.filter((id) => id !== itemId);
    } else {
      this.expandedItems = [...this.expandedItems, itemId];
    }

    this.dispatchEvent(
      new CustomEvent('accordion-change', {
        detail: {
          itemId,
          isExpanded: !isExpanded,
          expandedItems: this.expandedItems,
        },
        bubbles: true,
        composed: true,
      })
    );
  }
} 