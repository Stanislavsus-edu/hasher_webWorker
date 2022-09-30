import Worker from './web.worker';

export default class Hasher {
  constructor(element) {
    this.element = element;
    this.hasherDnd = this.element.querySelector('.hasherDnd');
    this.hasherDropplace = this.element.querySelector('.hasherDropplace');
    this.hashAlgorithm = this.element.querySelector('.hashAlgorithm');
    this.hash = this.element.querySelector('.hash');
    this.worker = new Worker();

    this.dragoverVisible = this.dragoverVisible.bind(this);
    this.dragoverHidden = this.dragoverHidden.bind(this);
  }

  init() {
    this.element.addEventListener('dragover', this.dragoverVisible);
    this.hasherDnd.addEventListener('dragleave', this.dragoverHidden);
    this.worker.addEventListener('message', ({ data: result }) => {
      this.hash.innerText = result;
    });
    this.worker.addEventListener('error', (event) => {
      console.error(event);
    });
    this.hashAlgorithm.addEventListener('change', () => {
      this.worker.postMessage({
        file: this.hasherDropplace.files[0],
        currentAlgorithm: this.hashAlgorithm.value,
      });
    });
    this.getFile();
  }

  dragoverVisible() {
    this.hasherDnd.style.background = 'gainsboro';
    this.hasherDnd.style.borderStyle = 'dashed';
  }

  dragoverHidden() {
    this.hasherDnd.style.background = 'white';
    this.hasherDnd.style.borderStyle = 'solid';
  }

  getFile() {
    this.hasherDropplace.addEventListener('drop', () => {
      this.dragoverHidden();
    });

    this.hasherDropplace.addEventListener('change', (event) => {
      event.preventDefault();
      this.worker.postMessage({
        file: this.hasherDropplace.files[0],
        currentAlgorithm: this.hashAlgorithm.value,
      });
    });
  }
}
