import {colorShadow} from '../utils/utils.js';

export default class TrafficLight {
  constructor(container, colors, renderLightMethod) {
    this._container = container;
    this._red = colors.red;
    this._yellow = colors.yellow;
    this._green = colors.green;
    this._renderLightMethod = renderLightMethod;
    this._manual = this._manualMode.bind(this);
    this._auto = this._autoMode.bind(this);
    this._stopAuto = this._stopAutoMode.bind(this);
}

  _manualMode() {
    for (let i = 0; i < 3; i++) {
      let step = i + 1;
      if (this._container.classList.contains(colorShadow.red) || this._container.classList.contains(colorShadow.yellow) || this._container.classList.contains(colorShadow.green)) {
        if (this._elementList[i].classList.contains(this._red)) {
          this._elementList[i].classList.remove(this._red);
          this._elementList[step].classList.add(this._yellow);
          this._container.classList.remove(colorShadow.red);
          this._container.classList.add(colorShadow.yellow);
          i++;
        } else if (this._elementList[i].classList.contains(this._yellow)) {
          this._elementList[i].classList.remove(this._yellow);
          this._elementList[step].classList.add(this._green);
          this._container.classList.remove(colorShadow.yellow);
          this._container.classList.add(colorShadow.green);
          i++;
        } else if (this._elementList[i].classList.contains(this._green)) {
          this._elementList[i].classList.remove(this._green);
          this._elementList[0].classList.add(this._red);
          this._container.classList.remove(colorShadow.green);
          this._container.classList.add(colorShadow.red);
          i = 0;
        }
      } else {
        this._elementList[0].classList.add(this._red);
        this._container.classList.add(colorShadow.red);
        i++;
      }
    }
}

  _autoMode() {
    this._timer = setInterval( () => {
      this._manual();
    }, 2000);
    const body = document.querySelector('.page');
    const element = document.createElement('button');
    element.classList.add('button__switch');
    element.textContent = 'Stop';
    body.append(element);
    element.addEventListener('click', this._stopAuto);
    this._button[1].setAttribute('disabled','disabled');
    this._button[1].classList.add('button_disabled');
  }

  _stopAutoMode(evt) {
  clearInterval(this._timer);
  for (let i = 0; i < 3; i++) {
      if (this._elementList[i].classList.contains(this._red)) {
        this._elementList[i].classList.remove(this._red);
        this._container.classList.remove(colorShadow.red);
      } else if (this._elementList[i].classList.contains(this._yellow)) {
        this._elementList[i].classList.remove(this._yellow);
        this._container.classList.remove(colorShadow.yellow);
      } else if (this._elementList[i].classList.contains(this._green)) {
        this._elementList[i].classList.remove(this._green);
        this._container.classList.remove(colorShadow.green);
      }
  }
  this._button[1].removeAttribute('disabled');
  this._button[1].classList.remove('button_disabled');
  evt.target.remove();
  }

  _setEvetnListeners() {
    this._button[0].addEventListener('click', this._manual);
    this._button[1].addEventListener('click', this._auto);
  }

  generateTraffic() {
    this._renderLightMethod();
    this._button = document.querySelectorAll('.button__switch');
    this._elementList = this._container.querySelectorAll('.container__circle');
    this._setEvetnListeners();
  }
}
