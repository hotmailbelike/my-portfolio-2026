/* -----------------------------------------
  Copy-email buttons. Markup: CopyEmailButton.astro. Each button's list item
  ships hidden and is revealed here, so visitors without JavaScript or
  clipboard access never see a button that does nothing; they still have the
  mailto link in the Contact section.
 ---------------------------------------- */

const COPIED_STATE_MS = 1800;
/* Screen readers skip a live region whose text is set to what it already says,
   so the message is cleared first and written back after this short pause. */
const ANNOUNCE_DELAY_MS = 100;
const COPIED_CLASS = 'is-copied';
const COPIED_MESSAGE = 'Email address copied to the clipboard';

interface CopyEmailTimers {
  announce?: number;
  reset?: number;
}

const timersByRoot = new WeakMap<HTMLElement, CopyEmailTimers>();

const showCopied = (root: HTMLElement, label: HTMLElement, status: HTMLElement, idleLabel: string): void => {
  const timers = timersByRoot.get(root) ?? {};
  window.clearTimeout(timers.announce);
  window.clearTimeout(timers.reset);

  root.classList.add(COPIED_CLASS);
  label.textContent = 'Copied';
  status.textContent = '';

  timers.announce = window.setTimeout(() => {
    status.textContent = COPIED_MESSAGE;
  }, ANNOUNCE_DELAY_MS);
  timers.reset = window.setTimeout(() => {
    root.classList.remove(COPIED_CLASS);
    label.textContent = idleLabel;
    status.textContent = '';
  }, COPIED_STATE_MS);
  timersByRoot.set(root, timers);
};

const initCopyEmail = (root: HTMLElement): void => {
  const button = root.querySelector<HTMLButtonElement>('[data-copy-email-button]');
  const label = root.querySelector<HTMLElement>('[data-copy-email-label]');
  const status = root.querySelector<HTMLElement>('[data-copy-email-status]');
  const email = root.dataset.copyEmail;

  if (!button || !label || !status || !email) {
    return;
  }

  const hasClipboard = typeof navigator.clipboard?.writeText === 'function';
  if (!hasClipboard) {
    return;
  }

  const idleLabel = label.textContent ?? '';
  root.hidden = false;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      showCopied(root, label, status, idleLabel);
    } catch {
      // Clipboard access can be refused (permissions, insecure context); fall back to the mail app.
      window.location.href = `mailto:${email}`;
    }
  });
};

document.querySelectorAll<HTMLElement>('[data-copy-email]').forEach(initCopyEmail);
