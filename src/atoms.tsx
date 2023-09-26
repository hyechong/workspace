import { atom, selector } from 'recoil';

export interface IToGo {
  text: string;
  id: number;
  category: 'TO_GO' | 'WENT' | 'LIKE';
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
	
    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const toGoState = atom<IToGo[]>({
  key: 'toGo',
  default: [],
  effects:[localStorageEffect('toGo')]
});

export const toGoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toGos = get(toGoState);
    return [
      toGos.filter((toGo) => toGo.category === 'TO_GO'),
      toGos.filter((toGo) => toGo.category === 'WENT'),
      toGos.filter((toGo) => toGo.category === 'LIKE'),
    ];
  },
});
