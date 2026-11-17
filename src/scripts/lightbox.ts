/* -----------------------------------------
  Screenshot lightbox. Markup: ScreenGallery.astro. Each trigger carries the
  large image URL and its text; one shared <dialog> shows whichever was
  clicked. showModal() gives focus trapping and Esc-to-close for free, and
  the browser returns focus to the trigger when the dialog closes.
 ---------------------------------------- */

const isOutsideBox = (event: MouseEvent, box: DOMRect): boolean =>
  event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;

const initLightbox = (root: HTMLElement): void => {
  const dialog = root.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  const image = dialog?.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const caption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
  const closeButton = dialog?.querySelector<HTMLButtonElement>('[data-lightbox-close]');

  if (!dialog || !image || !caption || !closeButton) {
    return;
  }

  // The image stays hidden until the new file has loaded, so a slow
  // connection shows an empty frame rather than the previous screenshot.
  const revealImage = (): void => {
    image.hidden = false;
  };
  image.addEventListener('load', revealImage);
  image.addEventListener('error', revealImage);

  root.querySelectorAll<HTMLButtonElement>('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const { lightboxSrc, lightboxAlt, lightboxCaption, lightboxWidth, lightboxHeight } = trigger.dataset;
      if (!lightboxSrc) {
        return;
      }
      image.hidden = true;
      image.alt = lightboxAlt ?? '';
      image.width = Number(lightboxWidth) || 0;
      image.height = Number(lightboxHeight) || 0;
      image.src = lightboxSrc;
      if (image.complete && image.naturalWidth > 0) {
        revealImage();
      }
      caption.textContent = lightboxCaption ?? '';
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', () => dialog.close());

  // Clicks on the backdrop target the dialog itself, but so do clicks on its
  // padding; only a click outside the dialog's box counts as the backdrop.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog && isOutsideBox(event, dialog.getBoundingClientRect())) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
    image.alt = '';
  });
};

document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach(initLightbox);
