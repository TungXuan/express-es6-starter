import { CODE } from '../constants';
const fieldValidation = (input, template) => {
  for (let i = 0; i < template.length; i++) {
    if (!input[template[i]]) return template[i];
  }
  return null;
};

export const isVerifiedToken = async (req, res, next) => {
  next();
};

export const paramsValidation = async (req, res, params, query, body, next) => {
  const paramChecked = fieldValidation(req.params, params);
  const queryChecked = fieldValidation(req.query, query);
  const bodyChecked = fieldValidation(req.body, body);
  if (paramChecked) {
    res.json({
      code: CODE.MISSING_PARAM,
      result: `Missing! You are missing params filed: [${paramChecked}]"`,
    });
  }  else if (queryChecked) {
    res.json({
      code: CODE.MISSING_QUERY,
      result: `Missing! You are missing query filed: [${queryChecked}]`,
    });
  } else if (bodyChecked) {
    res.json({
      code: CODE.MISSING_BODY,
      result: `Missing! You are missing body filed: [${bodyChecked}]`,
    });
  } else {
    next();
  }
};

