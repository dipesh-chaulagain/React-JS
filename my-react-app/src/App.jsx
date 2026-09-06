import CounterApp from "./component/counter/CounterApp"
import Hello from "./component/Hello"
import Max from "./component/max"
import Child from "./component/parent_child/Child"
import CreateAssignment from "./component/assignment/CreateAssignment"
import Parent from "./component/parent_child/Parent"
import NewCreateAssignment from "./component/assignment/NewCreateAssignment"
import EmployeeForm from "./component/assignment/EmployeeForm"
import CreateProduct from "./component/assignment/CreateProduct"
import EventRegistrationForm from "./component/assignment/EventRegistrationForm"
function App() {
  return (
    <>
      {/* <Max/>
      <Hello/>
      <Parent/>
      <CounterApp/> */}
      {/* <CreateAssignment/> */}
      {/* <NewCreateAssignment/> */}
      <EmployeeForm/>
      <CreateProduct/>
      <EventRegistrationForm/>
    </>
  )
}

export default App
