import {useState} from "react";
const CounterApp = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Counter App</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
            <p>Count: {count}</p>
        </div>
    );
}
export default CounterApp;