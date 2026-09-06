import Child1 from "./Child1";

const Child = ({value}) => {
    const message = "Hello from Child Component!!!!"
    return (
        <div>
            <h1>Child Component</h1>
            <p>Message from parent: {value}</p>
            <Child1 value={message} />
        </div>
    );
}
export default Child;