import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@customElement('lit-avatar')
export class LitAvatar extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background-color: #e2e8f0;
      color: #64748b;
      font-weight: 500;
    }

    .avatar.sm {
      width: 2rem;
      height: 2rem;
      font-size: 0.75rem;
    }

    .avatar.md {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }

    .avatar.lg {
      width: 3rem;
      height: 3rem;
      font-size: 1rem;
    }

    .avatar.xl {
      width: 4rem;
      height: 4rem;
      font-size: 1.25rem;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-group {
      display: flex;
      align-items: center;
    }

    .avatar-group .avatar {
      border: 2px solid white;
      margin-left: -0.5rem;
    }

    .avatar-group .avatar:first-child {
      margin-left: 0;
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      border: 2px solid white;
      border-radius: 50%;
    }

    .status-indicator.online {
      background-color: #22c55e;
    }

    .status-indicator.offline {
      background-color: #94a3b8;
    }

    .status-indicator.busy {
      background-color: #ef4444;
    }

    .status-indicator.away {
      background-color: #f59e0b;
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) initials = '';
  @property({ type: String }) size: AvatarSize = 'md';
  @property({ type: String }) status: 'online' | 'offline' | 'busy' | 'away' | '' =
    '';

  render() {
    return html`
      <div class="avatar ${this.size}" style="position: relative;">
        ${this.src
          ? html`<img src=${this.src} alt=${this.alt} />`
          : html`<span>${this.initials}</span>`}
        ${this.status
          ? html`<div
              class="status-indicator ${this.status}"
              title=${this.status}
            ></div>`
          : null}
      </div>
    `;
  }

  static getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

@customElement('lit-avatar-group')
export class LitAvatarGroup extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .avatar-group {
      display: flex;
      align-items: center;
    }

    ::slotted(lit-avatar) {
      margin-left: -0.5rem;
      border: 2px solid white;
    }

    ::slotted(lit-avatar:first-child) {
      margin-left: 0;
    }

    .more-avatars {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background-color: #e2e8f0;
      border-radius: 50%;
      margin-left: -0.5rem;
      border: 2px solid white;
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 500;
    }
  `;

  @property({ type: Number }) max = 3;

  render() {
    return html`
      <div class="avatar-group">
        <slot></slot>
        ${this._getExtraAvatarsCount() > 0
          ? html`
              <div class="more-avatars">
                +${this._getExtraAvatarsCount()}
              </div>
            `
          : null}
      </div>
    `;
  }

  private _getExtraAvatarsCount(): number {
    const slottedElements = this.querySelectorAll('lit-avatar');
    return Math.max(0, slottedElements.length - this.max);
  }
} 