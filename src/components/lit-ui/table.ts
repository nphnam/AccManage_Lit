import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => string | number;
}

@customElement('lit-table')
export class LitTable extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th {
      background-color: #f8fafc;
      padding: 0.75rem 1rem;
      font-weight: 500;
      color: #1f2937;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e2e8f0;
      color: #4b5563;
    }

    tr:hover td {
      background-color: #f8fafc;
    }

    .sortable {
      cursor: pointer;
      user-select: none;
    }

    .sortable:hover {
      background-color: #f1f5f9;
    }

    .sort-icon {
      display: inline-block;
      margin-left: 0.5rem;
      transition: transform 0.2s;
    }

    .sort-icon.asc {
      transform: rotate(180deg);
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
    }

    .pagination-button {
      padding: 0.5rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      background: white;
      cursor: pointer;
      font-size: 0.875rem;
      color: #4b5563;
      transition: all 0.2s;
    }

    .pagination-button:hover:not(:disabled) {
      border-color: #94a3b8;
      color: #1f2937;
    }

    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: any[] = [];
  @property({ type: Number }) page = 1;
  @property({ type: Number }) pageSize = 10;
  @property({ type: String }) sortKey = '';
  @property({ type: String }) sortDirection: 'asc' | 'desc' = 'asc';

  render() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const totalPages = Math.ceil(this.data.length / this.pageSize);
    const displayData = this._getSortedData().slice(startIndex, endIndex);

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${this.columns.map(
                (column) => html`
                  <th
                    class=${column.sortable ? 'sortable' : ''}
                    @click=${() =>
                      column.sortable && this._handleSort(column.key)}
                  >
                    ${column.label}
                    ${column.sortable && column.key === this.sortKey
                      ? html`
                          <span
                            class="sort-icon ${this.sortDirection === 'asc'
                              ? 'asc'
                              : ''}"
                          >
                            ▼
                          </span>
                        `
                      : null}
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${displayData.length === 0
              ? html`
                  <tr>
                    <td colspan=${this.columns.length} class="empty-state">
                      No data available
                    </td>
                  </tr>
                `
              : displayData.map(
                  (row) => html`
                    <tr>
                      ${this.columns.map(
                        (column) => html`
                          <td>
                            ${column.render
                              ? column.render(row[column.key], row)
                              : row[column.key]}
                          </td>
                        `
                      )}
                    </tr>
                  `
                )}
          </tbody>
        </table>
      </div>
      ${totalPages > 1
        ? html`
            <div class="pagination">
              <button
                class="pagination-button"
                ?disabled=${this.page === 1}
                @click=${() => this._handlePageChange(this.page - 1)}
              >
                Previous
              </button>
              <span>Page ${this.page} of ${totalPages}</span>
              <button
                class="pagination-button"
                ?disabled=${this.page === totalPages}
                @click=${() => this._handlePageChange(this.page + 1)}
              >
                Next
              </button>
            </div>
          `
        : null}
    `;
  }

  private _getSortedData() {
    if (!this.sortKey) return this.data;

    return [...this.data].sort((a, b) => {
      const aValue = a[this.sortKey];
      const bValue = b[this.sortKey];
      const direction = this.sortDirection === 'asc' ? 1 : -1;

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }

  private _handleSort(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }

    this.dispatchEvent(
      new CustomEvent('sort-change', {
        detail: { key, direction: this.sortDirection },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handlePageChange(newPage: number) {
    this.page = newPage;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: { page: newPage },
        bubbles: true,
        composed: true,
      })
    );
  }
} 