// eslint-disable-next-line import/prefer-default-export
export const pluralizeText = (count, text, pluralText = 's') => {
  let suffixText = text;
  if (count !== 1) {
    suffixText += pluralText;
  }
  return `${count} ${suffixText}`;
};
