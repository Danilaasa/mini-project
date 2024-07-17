import React from "react"
import { App } from "./components/App/App"
import "/src/style.css"
import { createRoot } from "react-dom/client"

const domNode = document.getElementById("root") as HTMLElement
const root = createRoot(domNode)
root.render(<App />)