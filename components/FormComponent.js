"use strict";

import { oppoStatus } from "../data/oppoStatus.js";
import { getElement } from "../utils/getElement.js";
import { convertKeysToLowerCase } from "../utils/convertKeysToLowerCase.js";

const FormComponent = class {
  constructor(oppoStatus, form = "form", select = "status", input = "success") {
    if (!oppoStatus && oppoStatus.length > 0) throw new Error("Array is empty");

    this.oppoStatus = oppoStatus;
    this.form = document.querySelector(form);
    this.select = getElement(select);
    this.input = getElement(input);
  }
  outputValue = {};

  start() {
    this.setOutputValue(this.oppoStatus[0]);
    this.addSelectOptions();
    this.filterdSelectedValue();
    this.formSubmitHandler();
  }

  addSelectOptions() {
    this.oppoStatus.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.K_OPPO_STATUS;
      option.textContent = item.STATUS;
      this.select.appendChild(option);
    });
  }

  filterdSelectedValue() {
    this.select.addEventListener("change", (event) => {
      const selectedValue = +event.target.value;
      const filteredSelectedValue = this.oppoStatus.find(
        (item) => item.K_OPPO_STATUS === selectedValue
      );
      this.setOutputValue(filteredSelectedValue);
    });
  }

  formSubmitHandler() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const output = document.querySelector(".output");
      const status = this.outputValue.STATUS.split(".").shift();
      this.outputValue.STATUS = +status;
      const htmlOutputValue = JSON.stringify(
        convertKeysToLowerCase(this.outputValue)
      );
      output.innerHTML = htmlOutputValue;
    });
  }

  setOutputValue({ K_OPPO_STATUS, ...selectedDataObj }) {
    this.input.value = selectedDataObj.SUCCESS;
    this.outputValue = selectedDataObj;
  }
};

try {
  const fc = new FormComponent(oppoStatus, "form", "status", "success");
  fc.start();
} catch (error) {
  // ...pass onto logger service
  console.error(error);
}
