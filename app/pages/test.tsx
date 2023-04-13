import { BlitzPage } from "blitz"
import { useState } from "react"

const Test2Page: BlitzPage = () => {
  return (
    <div>
      Hello
      <div>
        <Counter />
        <Counter />
      </div>
    </div>
  )
}

// function Counter()
const Counter = () => {
  let [count, setCount] = useState(0)
  return (
    <div className="p-4 mb-2 border bg-red-300">
      Counter {count}
      <div>
        <button onClick={() => setCount(count + 1)}>Inc</button>
      </div>
    </div>
  )
}
export default Test2Page
