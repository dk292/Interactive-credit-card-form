const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);
  formElement.setAttribute("novalidate", "");

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) =>
    input.addEventListener("input", () => {
      input.parentNode.removeAttribute("data-error");
    })
  );

  new Cleave("#number", {
    creditCard: true,
  });

  new Cleave("#month", {
    date: true,
    datePattern: ["m"],
  });

  const validateOptions = [
    {
      attribute: "name",
      isValid: (input) => input.value.trim() !== "",
      errorMsg: (input, label) => `${label.textContent} is required`,
    },
  ];

  const validateSingleFormGroups = (formGroup) => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input");
    const cardNumImg = document.getElementById("cardNum");
    const holderNameimg = document.getElementById("holderName");
    const exprDate = document.getElementById("exprDate");
    const pinNum = document.getElementById("pinNum");

    let formGroupError = false;
    for (const option of validateOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        formGroup.setAttribute(
          "data-error",
          `${option.errorMsg(input, label)}`
        );
        formGroupError = true;
      }
    }
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    if (!formGroupError) {
      holderNameimg.textContent = document.querySelector("#name").value;
      cardNumImg.textContent = document.querySelector("#number").value;
      exprDate.textContent = `${month.value} / ${year.value}`;
      pinNum.textContent = document.querySelector("#cvc").value;
    }

    return !formGroupError;
  };

  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".formGroup")
    );
    formGroups.forEach((formGroup) => validateSingleFormGroups(formGroup));
    return formGroups.every((formGroup) => validateSingleFormGroups(formGroup));
  };

  formElement.addEventListener("submit", (event) => {
    const formValid = validateAllFormGroups(formElement);
    if (!formValid) {
      event.preventDefault();
    } else {
      event.preventDefault();
      formElement.innerHTML = `<div class="complete-container"><div class="complete"><img src="../images/icon-complete.svg"></div><h2>Thank you!</h2><p>We've added your card details </p><a href="#">Continue</a></div>`;
    }
  });
};

validateForm("#field");
