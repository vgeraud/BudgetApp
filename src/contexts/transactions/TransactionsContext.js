import React from "react";

const TransactionsContext = React.createContext({
    transactions: [],
    saveTransactions: () => {},
    updateTransaction: () => {}
});

export default TransactionsContext;