import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './dashboard/Dashboard'
import TransactionsContextProvider from './contexts/transactions/TransactionsContextProvider'
import BudgetContextProvider from './contexts/budget/BudgetContextProvider'
import './App.css'


function App() {

    return (
        <ChakraProvider>
            <TransactionsContextProvider>
                <BudgetContextProvider>
                    <Dashboard />
                </BudgetContextProvider>
            </TransactionsContextProvider>
        </ChakraProvider>
    )
}

export default App
