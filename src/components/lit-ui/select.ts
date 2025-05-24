import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface SelectOption {
  value: string;
  label: string;
}

@customElement('lit-select')
export class LitSelect extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .select-container {
      position: relative;
      width: 100%;
    }

    .select-button {
      width: 100%;
      padding: 0.5rem 2.5rem 0.5rem 0.75rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      cursor: pointer;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: #1f2937;
      transition: all 0.2s;
    }

    .select-button:hover {
      border-color: #94a3b8;
    }

    .select-button:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .select-button::after {
      content: '';
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #64748b;
    }

    .options-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 0.25rem;
      padding: 0.25rem 0;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 50;
      max-height: 15rem;
      overflow-y: auto;
      display: none;
    }

    .options-list.show {
      display: block;
    }

    .option {
      padding: 0.5rem 0.75rem;
      cursor: pointer;
      font-size: 0.875rem;
      color: #1f2937;
      transition: all 0.2s;
    }

    .option:hover {
      background: #f1f5f9;
    }

    .option.selected {
      background: #e2e8f0;
    }
  `;

  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String, reflect: true }) value = '';
  @property({ type: String }) placeholder = 'Select an option';
  @state() private isOpen = false;

  render() {
    const selectedOption = this.options.find(opt => opt.value === this.value);

    return html`
      <div class="select-container">
        <button
          class="select-button"
          @click=${this._toggleOptions}
          type="button"
        >
          ${selectedOption ? selectedOption.label : this.placeholder}
        </button>
        <div class="options-list ${this.isOpen ? 'show' : ''}">
          ${this.options.map(
            option => html`
              <div
                class="option ${option.value === this.value ? 'selected' : ''}"
                @click=${() => this._selectOption(option)}
              >
                ${option.label}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  private _toggleOptions(e: Event) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  private _selectOption(option: SelectOption) {
    this.value = option.value;
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: option.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside.bind(this));
  }

  private _handleClickOutside(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
} 