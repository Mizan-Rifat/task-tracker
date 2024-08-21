import { create } from 'zustand';

interface RouterState {
  currentRoute: string;
  setCurrentRoute: (route: string, param?: null | number | string) => void;
  param: null | number | string;
}

export const useRouter = create<RouterState>(set => ({
  currentRoute: '/',
  param: null,
  setCurrentRoute: (route, param) => set({ currentRoute: route, param: param || null })
}));
