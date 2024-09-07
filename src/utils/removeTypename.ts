const omitTypename = (key: string, value: unknown) => {
  return key === '__typename' ? undefined : value;
};

export const removeTypename = (operationName: string, variables: Record<string, unknown>) => {
  if (!variables)
    throw new Error(`removeTypename(), variables arg is falsey. Operation name: ${operationName}`);

  return JSON.parse(JSON.stringify(variables, omitTypename));
};
