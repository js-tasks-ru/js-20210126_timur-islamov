export default class NotificationMessage {
  static currentElement = null;
  element = null;
  message = '';
  type = '';
  duration = 0;

  constructor(message, config = {}) {
    const { duration = 0, type = 'success' } = config;

    this.message = message;
    this.type = type;
    this.duration = duration;

    if (NotificationMessage.currentElement) {
      NotificationMessage.currentElement.remove();
    }

    this.render();
  }

  get template() {
    return `<div class="notification" style="--value:20s">
              <div class="timer"></div>
              <div class="inner-wrapper">
                <div class="notification-header">success</div>
                <div class="notification-body">
                  Hello world
                </div>
              </div>
            </div>`;
  }

  render(target) {
    let element;

    if (target) {
      element = target;
    }
    else {
      element = document.createElement('div');
    }

    element.innerHTML = this.template;

    element.firstElementChild.style.setProperty('--value', `${this.duration / 1000}s`);
    element.firstElementChild.classList.add(this.type);
    element.querySelector('.notification-header').innerHTML = this.type;
    element.querySelector('.notification-body').innerHTML = this.message;

    this.element = element.firstElementChild;
    NotificationMessage.currentElement = element.firstElementChild;
  }

  show(target) {
    this.render(target);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.destroy();
  }
}
