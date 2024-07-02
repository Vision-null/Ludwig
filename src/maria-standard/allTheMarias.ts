const { ariaObject } = require('../aria-standards/critical/aria-object');

export function inputButtonText(input: any, ariaRecommendations: any) {
  const inputButtonsWithoutText: any[] = [];
  input.forEach((el: any) => {
    const line = Math.floor(Math.random() * 5000) + 1;
    inputButtonsWithoutText.push([el.outerHTML, line]);
    ariaRecommendations[line] = [ariaObject.inputButton, el.outerHTML];
  });
  return inputButtonsWithoutText;
}
