import { useState, useEffect } from "react";
import TransactionsContext from "./TransactionsContext";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utils/storage";

const localStorageKey = "transactions";

const TransactionsContextProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const savedTransactions = loadFromLocalStorage(localStorageKey);
        setTransactions(savedTransactions ?? []);
    }, []);

    const saveTransactions = (newTransactions) => {
        const filteredTransactions = newTransactions.filter(x => !transactions.some(y => y.id === x.id));

        setTransactions([...transactions, ...filteredTransactions]);
        saveToLocalStorage(localStorageKey, [...transactions, ...filteredTransactions]);
    };

    const updateTransaction  = (updatedTransaction) => {
        const updatedTransactions = transactions.map(transaction => {
            if (transaction.id == updatedTransaction.id) {
                return updatedTransaction;
            }

            return transaction
        })

        setTransactions(updatedTransactions);
        saveToLocalStorage(localStorageKey, updatedTransactions);
    };

    const value = {
        transactions,
        saveTransactions,
        updateTransaction
    };

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
};

export default TransactionsContextProvider;