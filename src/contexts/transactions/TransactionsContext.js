import React from "react";

const TransactionsContext = React.createContext({
    transactions: [],
    selectedMonth: {
        year: null,
        month: null
    },
    setSelectedMonth: () => {},
    saveTransactions: () => {},
    updateTransaction: () => {}
});

export default TransactionsContext;