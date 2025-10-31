// Palette Halloween
export const halloweenCategoryColors: Record<string, string> = {
  'Alimentation': '#4caf50',
  'Logement': '#2196f3',
  'Transport': '#ff9800',
  'Loisirs': '#9c27b0',
  'Santé': '#f44336',
  'Factures': '#00bcd4',
  'Shopping': '#ffeb3b',
  'Éducation': '#ff5722',
  'Épargne': '#009688',
};

// Palette normale
export const normalCategoryColors: Record<string, string> = {
  'Alimentation': '#2A9699',
  'Logement': '#49BD9D',
  'Transport': '#EE4D66',
  'Loisirs': '#A9216B',
  'Santé': '#F7DC6A',
  'Factures': '#ff6f61',
  'Shopping': '#91C95A',
  'Éducation': '#F5A027',
  'Épargne': '#E14949',
};

export const getCategoryColors = (isHalloweenMode: boolean): Record<string, string> => {
  return isHalloweenMode ? halloweenCategoryColors : normalCategoryColors;
};

export const categoryColors = halloweenCategoryColors;
