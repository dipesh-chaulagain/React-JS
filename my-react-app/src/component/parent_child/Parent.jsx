import Child from "./Child"
const Parent = () => {
    const message="Hello from Parent Component!!!!"
    return (
        <div>
            <h1>{message}</h1>
            <Child value={message} />
        </div>
    );
};
export default Parent;