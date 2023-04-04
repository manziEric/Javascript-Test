"use strict";

import { oppoStatus } from "../data/oppoStatus.js";

const FormComponent = class {
  constructor() {}
  start() {
    const form = document.querySelector("form");
    const select = document.querySelector('[name="status"]');
    const input = document.querySelector('[name="success"]');
    const outputValues = [];

    this.addSelectOptions(select);
    this.filterdSelectedValue(select, input, outputValues);
    this.formSubmitHandler(form, outputValues);
  }

  addSelectOptions(select) {
    oppoStatus.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.K_OPPO_STATUS;
      option.textContent = item.STATUS;
      select.appendChild(option);
    });
  }

  filterdSelectedValue(select, input, outputValues) {
    select.addEventListener("change", (event) => {
      const selectedValue = +event.target.value;
      const filteredSelectedValue = oppoStatus.find(
        (item) => item.K_OPPO_STATUS === selectedValue
      );
      const { K_OPPO_STATUS, ...selectedDataObj } = filteredSelectedValue;
      input.value = selectedDataObj.SUCCESS;
      outputValues.push(selectedDataObj);
    });
  }

  formSubmitHandler(form, outputValues) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const output = document.querySelector(".output");
      const outputObj = outputValues[0];
      const status = outputObj.STATUS.split(".").shift();
      outputObj.STATUS = +status;
      const lowerKeysObj = Object.entries(outputObj).reduce(
        (acc, [key, value]) => {
          acc[key.toLowerCase()] = value;
          return acc;
        },
        {}
      );
      const htmlOutputValue = JSON.stringify(lowerKeysObj);
      output.innerHTML = htmlOutputValue;
    });
  }
};

const fc = new FormComponent();
fc.start();
