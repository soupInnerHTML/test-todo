import React from 'react';
import {TodoList} from "./components/TodoList";
import {MetamaskCard} from "./components/MetamaskCard";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <TodoList />
      <MetamaskCard />
    </div>
  );
}

export default App;
