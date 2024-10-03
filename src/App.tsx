import Form from "./components/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activityReducers"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  // Declaramos el useReducer, y le tenemos que pasar el parametro que corresponde al useReducer que estamos utilizando
  // y también un estado inicial. Eso da acceso al estado y al disparador (Dispatch)

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const CanRestartApp = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-green-800 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg text-white font-bold uppercase">Contador de Calorias</h1>
          <button className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer
          rounded-lg text-sm disabled:opacity-10"
            disabled={!CanRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >Reiniciar APP
          </button>
        </div>
      </header>
      <section className="bg-green-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            // Pasamos el disparador (Dispatch) al Form para que se ejecute en esta parte del código
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker 
          activities={state.activities}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
