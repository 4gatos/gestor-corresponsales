export const getRandomString = () => (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');