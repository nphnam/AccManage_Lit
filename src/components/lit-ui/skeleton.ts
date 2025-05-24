import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-skeleton')
export class LitSkeleton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--skeleton-color, #e2e8f0) 25%,
        var(--skeleton-highlight, #f1f5f9) 50%,
        var(--skeleton-color, #e2e8f0) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: var(--skeleton-radius, 0.375rem);
    }

    .skeleton.text {
      height: 1em;
      margin-bottom: 0.5em;
    }

    .skeleton.circle {
      border-radius: 50%;
      aspect-ratio: 1;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  @property({ type: String }) variant: 'text' | 'rectangle' | 'circle' = 'text';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = 'auto';
  @property({ type: String }) color = '#e2e8f0';
  @property({ type: String }) highlightColor = '#f1f5f9';
  @property({ type: String }) borderRadius = '0.375rem';

  render() {
    return html`
      <div
        class="skeleton ${this.variant}"
        style="
          width: ${this.width};
          height: ${this.height};
          --skeleton-color: ${this.color};
          --skeleton-highlight: ${this.highlightColor};
          --skeleton-radius: ${this.borderRadius};
        "
      ></div>
    `;
  }
} 