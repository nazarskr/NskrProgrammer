export const catchElementScroll = (elemId: string) => {
    if (elemId) {
      const element = document.getElementById(elemId);
      const topPos = element.getBoundingClientRect().top;
      if (topPos < 650 && topPos > -1000) {
        return true;
      } else {
        return false;
      }
    }
};
export const getRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
