const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  galleryListRef: document.querySelector('.js-gallery'),
  modalRef: document.querySelector('.js-lightbox'),
  closeModalButtonRef: document.querySelector('[data-action=close-lightbox]'),
  lightboxOverlayRef: document.querySelector('.lightbox__overlay'),
  lightboxImgRef: document.querySelector('.lightbox__image'),
};

refs.galleryListRef.addEventListener('click', galleryListClick);

refs.lightboxOverlayRef.addEventListener('click', closeModalOverlayHandler);

refs.closeModalButtonRef.addEventListener('click', modalClose);

function creatingGalleryCards(gallery) {
  const markUp = gallery
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`,
    )
    .join('');

  addingMarkUp(markUp);
}

function addingMarkUp(markUp) {
  refs.galleryListRef.insertAdjacentHTML('beforeend', markUp);
}

function galleryListClick(event) {
  event.preventDefault();
  const galleryTarget = event.target.classList.contains('gallery__image');

  if (!galleryTarget) {
    return;
  }

  const imageUrl = event.target.dataset.source;

  refs.lightboxImgRef.src = imageUrl;

  refs.lightboxImgRef.alt = event.target.alt;

  refs.modalRef.classList.add('is-open');

  document.addEventListener('keydown', esc);
}

function closeModalOverlayHandler(e) {
  if (!e.target.classList.contains('lightbox__overlay')) {
    return;
  }

  modalClose();
}

function modalClose() {
  refs.modalRef.classList.remove('is-open');
  refs.lightboxImgRef.src = '';
  refs.lightboxImgRef.alt = '';

  document.removeEventListener('keydown', esc);
}

function esc(e) {
  let totalPicture;
  if (e.code === 'ArrowRight') {
    galleryItems.forEach((galleryItem, i) => {
      if (refs.lightboxImgRef.src === galleryItem.original) {
        totalPicture = i;
      }
    });

    if (totalPicture === galleryItems.length - 1) {
      refs.lightboxImgRef.src =
        galleryItems[galleryItems.length - galleryItems.length].original;

      refs.lightboxImgRef.alt =
        galleryItems[galleryItems.length - galleryItems.length].description;

      return;
    }

    refs.lightboxImgRef.src = galleryItems[totalPicture + 1].original;
    refs.lightboxImgRef.alt = galleryItems[totalPicture + 1].description;
  }

  if (e.code === 'ArrowLeft') {
    galleryItems.forEach((galleryItem, i) => {
      if (refs.lightboxImgRef.src === galleryItem?.original) {
        totalPicture = i;
      }
    });

    if (totalPicture === 0) {
      refs.lightboxImgRef.src = galleryItems[galleryItems.length - 1].original;
      refs.lightboxImgRef.alt =
        galleryItems[galleryItems.length - 1].description;
      return;
    }

    refs.lightboxImgRef.src = galleryItems[totalPicture - 1]?.original;
    refs.lightboxImgRef.alt = galleryItems[totalPicture - 1]?.description;
  }

  if (e.code === 'Escape') {
    modalClose();
  }
}

creatingGalleryCards(galleryItems);
