export const parseUniqueCategories = entries => {
  if (!entries) return null;

  const categories = entries.map(entry =>
    entry.categories.map(({ id, name }) => ({ id, name }))
  ).flat();

  return categories.reduce((acc, category) => {
    if (!acc.find(({ id }) => id === category.id)) {
      acc.push(category);
    }
    return acc;
  }, []);
};
