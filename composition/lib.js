import config from '../sunrise.config';

export const caseCorrected = (
  value = '',
  key = 'countries'
) => {
  //get case insensitive locale from sunrise config
  const loc = value.toUpperCase();
  const [, fromConfig] =
    Object.keys(config[key])
      //all locale keys from config in [UPPERCASE,org]
      .map((key) => [key.toUpperCase(), key])
      .find(([key]) => key === loc) || []; //find the one from url
  return fromConfig; //return value from config (in correct case)
};
