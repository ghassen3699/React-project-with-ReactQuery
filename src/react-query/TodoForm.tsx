import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Todo } from './hooks/useTodos';
import axios from 'axios';

const TodoForm = () => {

  const querClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios.post('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
    onSuccess: (savedTodo) => {
      querClient.setQueryData<Todo[]>(['todos'], todos => [savedTodo, ...(todos || [])]);

      if (ref.current) ref.current.value = "";
    }
  })

  const ref = useRef<HTMLInputElement>(null);

  return (

    <>
      {addTodo.error && <div> Error : {addTodo.error.message}</div>}
      <form className="row mb-3" onSubmit={(e) => {
        e.preventDefault();
        if (ref.current && ref.current.value) {
          addTodo.mutate({
            id: 0,
            title: ref.current?.value || '',
            userId: 1,
            completed: false
          })
        }
      }}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
