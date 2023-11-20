const isValidUrl = (urlString: string) => {
  const urlPattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i;
  return urlPattern.test(urlString);
};

export default isValidUrl;
