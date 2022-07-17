import {colorElement} from '../utils/utils.js';
import TrafficLight from '../components/TrafficLight.js';


const container = document.querySelector(".traffic");

const trafficLight = new TrafficLight(container, colorElement, shapeMethod);

function shapeMethod() {
  container.classList.add('container');
  for (let i = 0; i < 3; i++) {
    const element = document.createElement('div');
    element.classList.add('container__circle');
    container.append(element);
  }
  for (let i = 0; i < 2; i++) {
    const element = document.createElement('button');
    element.classList.add('button__switch');
    container.after(element);
  }
  const buttonList = document.querySelectorAll('.button__switch');
  buttonList[0].textContent = 'Manual';
  buttonList[1].textContent = 'Auto';
}

trafficLight.generateTraffic();