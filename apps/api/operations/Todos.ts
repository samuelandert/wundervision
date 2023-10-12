import { createOperation, z } from '../generated/wundergraph.factory';

export default createOperation.query({
  input: z.object({}),
  handler: async () => {
    return [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: false },
    ];
  },
});