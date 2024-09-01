/* eslint-disable @typescript-eslint/no-explicit-any */
const omitTypename = (key: string, value: any) => {
  return key === '__typename' ? undefined : value;
};

export const removeTypename = (operationName: string, variables: Record<string, any>) => {
  if (!variables)
    throw new Error(`removeTypename(), variables arg is falsey. Operation name: ${operationName}`);

  return JSON.parse(JSON.stringify(variables, omitTypename));
};
/* eslint-enable @typescript-eslint/no-explicit-any */
