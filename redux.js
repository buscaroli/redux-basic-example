// LEARNING REDUX
// At the time of writing this code, in order to be able to use the 'import'
// syntax youn need to install the esm node package and run the script with:
// node -r esm redux.js

// Based on a Lecture from Stephen Grider, from his course on Udemy.

// Creating a store for an Insurance Company.
// The store tracks: The claims, the new policies and the available funds.

import { createStore, combineReducers } from 'redux'

// Action Creators.
// Actio creators are functions that return actions.
// Actions are objects that have two specific properties:
// - type
// - payload

const createPolicy = (name, amount) => {
    return ({
        type: 'CREATE_POLICY',
        payload: {
            name,
            amount
        }
    })
}

const deletePolicy = (name) => {
    return ({
        type: 'DELETE_POLICY',
        payload: {
            name
        }
    })
}

const claimPolicy = (name, amount) => {
    return ({
        type: 'CREATE_CLAIM',
        payload: {
            name,
            amount
        }
    })
}

// REDUCERS.
// Reducers are (should be as there is nothing to prevent you from using
// impure functions but beware of unexpected and difficult to track bugs!)
// that receive an action and modify the state of the store based on the 
// action's type.
// The first time a reducer is used it needs to have a value for the 
// parameter that he has been given, undefined will raise an error; be
// sure to give a default value as in the code below, this value will be
// used when the reducer is called for the very first time.


const billing = (funds = 1000, action) => {
    switch(action.type) {
        case 'CREATE_POLICY':
            return funds + action.payload.amount
            break
        case 'CREATE_CLAIM':
            return funds - action.payload.amount
            break
        default:
            return funds
    }
}

const policies = (listOfPolicies = [], action) => {
    switch(action.type) {
        case 'CREATE_POLICY':
            return [...listOfPolicies, action.payload.name]
            break
        case 'DELETE_POLICY':
            return listOfPolicies.filter(client => client !== action.payload.name)
            break
        default:
            return listOfPolicies
    }
}

const claims = (listOfClaims = [], action) => {
    switch(action.type) {
        case 'CREATE_CLAIM':
            return [...listOfClaims, action.payload.name]
            break
        default:
            return listOfClaims
    }
}


// The reducers need to be given as an input to the combineReducers function,
// this way, every time the dispatch function is called with an action-creator
// the action is passed to ALL the reducers that will update the state of the 
// store depending on the action type, as appropriate (eg if a new policy is 
// created we need to call to reducers: policies and billing, as they both 
// contain the 'CREATE_CLAIM' type, so the name of the client will be added to
// the 'listOfpolicies' of the store and the money will be added to the 'funds'
// of the store).
const departments = combineReducers ({
    policies,
    claims,
    billing
})

const store = createStore(departments)

// We use the 'dispatch' method every time we want to work on the store.
store.dispatch(createPolicy('Matt', 250))
store.dispatch(createPolicy('Mel', 240))
console.log(store.getState())

store.dispatch(claimPolicy('Matt', 300))
console.log(store.getState())

store.dispatch(createPolicy('Bob', 100))
console.log(store.getState())

store.dispatch(deletePolicy('Bob'))
console.log(store.getState())