import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export const getFavorites = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(FAVORITES_KEY);
  return json ? JSON.parse(json) : [];
};

export const toggleFavorite = async (id: string) => {
  const favorites = await getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter(fav => fav !== id)
    : [...favorites, id];

  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
};

export const isFavorite = async (id: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.includes(id);
};
