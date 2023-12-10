const omitTypename = (key, value) => {
  return key === '__typename' ? undefined : value;
};

export const removeTypename = (operationName, variables) => {
  if (!variables) throw new Error(`removeTypename(), variables arg is falsey. Operation name: ${operationName}`);
  return JSON.parse(JSON.stringify(variables, omitTypename));
};
