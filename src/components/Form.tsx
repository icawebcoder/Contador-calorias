import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
// Este import, es una dependencia que nos sirve para poner un ID único
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/category"
import { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activityReducers"

// Le ponemos un tipado a la función de Dispatch
type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

// Declaramos el estado inicial de mi formulario
const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeId) {
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)

        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })

    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    // Validación del formulario, y llamamos al disparador (Dispatch) para que lo ejecute
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: "save-activity", payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <>
            <form className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="category" className="font-bold">Categorías:</label>
                    <select
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        id="category"
                        value={activity.category}
                        onChange={handleChange}
                    >
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="name" className="font-bold">Actividad:</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                        placeholder="Ej. Comida, Jugo de Naranja, Pesas, Ensalada..."
                        value={activity.name}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <label htmlFor="calories" className="font-bold">Calorias:</label>
                    <input
                        id="calories"
                        type="number"
                        className="border border-slate-300 p-2 rounded-lg w-full"
                        placeholder="Calorias Ej. 300 o 500"
                        value={activity.calories}
                        onChange={handleChange}
                    ></input>
                </div>
                <input
                    type="submit"
                    className="bg-gray-500 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-10"
                    value={activity.category === 1 ? 'Registrar Comida' : 'Registrar Ejercicio'}
                    disabled={!isValidActivity()}
                >

                </input>
            </form>
        </>
    )
}
