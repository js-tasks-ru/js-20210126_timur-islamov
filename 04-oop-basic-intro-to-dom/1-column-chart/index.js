export default class ColumnChart {
  chartHeight = 50;
  element = null;
  data = [];
  label = '';
  value = '';
  link = '';

  // Note: Взято из тестов, так как сам не смог подобрать формулу подсчета элементов
  static calculateData(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  get template() {
    return `<div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title"></div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header"></div>
        <div data-element="body" class="column-chart__chart">
        </div>
      </div>
    </div>`;
  }

  get skeletonTemplate() {
    return `<svg width="299" height="109" viewBox="0 0 299 109" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="147" height="24" fill="#F5F6F8"/>
      <rect y="59" width="9" height="50" fill="#ECEEF3"/>
      <rect x="10" y="74" width="9" height="35" fill="#ECEEF3"/>
      <rect x="20" y="87" width="9" height="22" fill="#ECEEF3"/>
      <rect x="30" y="70" width="9" height="39" fill="#ECEEF3"/>
      <rect x="40" y="87" width="9" height="22" fill="#ECEEF3"/>
      <rect x="50" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="60" y="70" width="9" height="39" fill="#ECEEF3"/>
      <rect x="70" y="59" width="9" height="50" fill="#ECEEF3"/>
      <rect x="90" y="87" width="9" height="22" fill="#ECEEF3"/>
      <rect x="100" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="110" y="74" width="9" height="35" fill="#ECEEF3"/>
      <rect x="120" y="98" width="9" height="11" fill="#ECEEF3"/>
      <rect x="130" y="59" width="9" height="50" fill="#ECEEF3"/>
      <rect x="140" y="98" width="9" height="11" fill="#ECEEF3"/>
      <rect x="150" y="70" width="9" height="39" fill="#ECEEF3"/>
      <rect x="160" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="170" y="87" width="9" height="22" fill="#ECEEF3"/>
      <rect x="180" y="74" width="9" height="35" fill="#ECEEF3"/>
      <rect x="190" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="200" y="98" width="9" height="11" fill="#ECEEF3"/>
      <rect x="210" y="70" width="9" height="39" fill="#ECEEF3"/>
      <rect x="220" y="74" width="9" height="35" fill="#ECEEF3"/>
      <rect x="230" y="64" width="9" height="45" fill="#ECEEF3"/>
      <rect x="240" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="250" y="98" width="9" height="11" fill="#ECEEF3"/>
      <rect x="260" y="79" width="9" height="30" fill="#ECEEF3"/>
      <rect x="270" y="98" width="9" height="11" fill="#ECEEF3"/>
      <rect x="280" y="74" width="9" height="35" fill="#ECEEF3"/>
      <rect x="290" y="92" width="9" height="17" fill="#ECEEF3"/>
      <rect x="80" y="98" width="9" height="11" fill="#ECEEF3"/>
  </svg>
  `;
  }

  constructor({
    data = [],
    label = '',
    value = '',
    link = '',
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }



  createColumn(value, percent) {
    const element = document.createElement('div');

    element.style.setProperty('--value', value);
    element.dataset.tooltip = percent;

    return element;
  }

  createChart(container) {
    const charContainer = container.querySelector('.column-chart__chart');

    for (const chart of ColumnChart.calculateData(this.data)) {
      charContainer.append(this.createColumn(chart.value, chart.percent));
    }
  }

  createTitle(container) {
    const title = container.querySelector('.column-chart__title');
    title.innerHTML = this.label;

    if (this.link.length) {
      const link = document.createElement('a');
      const linkText = this.link === '#' ? '#' : `/${this.link}`;

      link.setAttribute('href', linkText);
      link.classList.add('column-chart__link');
      link.innerText = 'View all';

      title.append(link);
    }
  }

  createValueHeader(container) {
    const header = container.querySelector('.column-chart__header');

    if (this.value) {
      header.innerHTML = this.value;
    } else {
      header.innerHTML = `<svg width="299" height="109" viewBox="0 0 299 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="147" height="24" fill="#F5F6F8"/>
        <rect y="59" width="9" height="50" fill="#ECEEF3"/>
      </svg>
      `;
    }
  }

  render() {
    const container = document.createElement('div');
    container.innerHTML = this.template;

    if (this.data.length === 0) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      svg.innerHTML = this.skeletonTemplate;

      container.firstElementChild.classList.add('column-chart_loading');
      container.append(svg.firstElementChild);
    } else {
      this.createChart(container);
    }


    this.createTitle(container);
    this.createValueHeader(container);

    this.element = container.firstElementChild;
  }

  update({
    data = [],
    label = '',
    value = '',
    link = '',
  }) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;

    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
