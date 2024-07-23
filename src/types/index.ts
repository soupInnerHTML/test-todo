export interface Todo {
  createdAt: number //date
  title: string
  description: string;
  completed: boolean;
  id: string
}
export interface PancakePredictionV2 {
  methods: {
    currentEpoch(): { call(): Promise<number> };
  };
  // может расширяться
}

export enum TodoStatus {
  fetching, adding, deleting, editing, done, error
}
