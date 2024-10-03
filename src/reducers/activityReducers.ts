import { Activity } from "../types"

// Este apartado, son las acciones que vamos a realizar con el uso de useReducer, 
// y el payload es el parametro que le pasamos
export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'save-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' }

// Indicamos el tipo de cada variable del initialState
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Esta variable, corresponde al State de useReducer
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

// Esta variable, corresponde al Dispatch de useReducer, es llamado por el Formulario o la sección en la
// que se va a realizar la acción por el Dispatch
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if (action.type === 'save-activity') {
        let updateActivities: Activity[] = []
        if (state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId
                ? action.payload.newActivity
                : activity
            )
        } else {
            updateActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if (action.type === 'save-activeId') {

        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity') {

        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}