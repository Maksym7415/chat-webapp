export interface History {
  history: {
    push: (path: string, state: object) => void,
    location: Location
  },
}

interface Location {
  state: {
    [key: string]: any,
  },
}

export const mockHistoryProps = (state: object) => ({
  history: {
    push: (): void => {},
    location: {
      state,
    },
  },
});
