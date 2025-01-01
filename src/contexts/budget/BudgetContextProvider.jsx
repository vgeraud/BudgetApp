import { useState } from "react";
import BudgetContext from "./BudgetContext";

const BudgetContextProvider = ({ children }) => {
    const [budget, setBudget] = useState({
        "Mortgage & rent": 2639.62,
        "Home insurance": 59.35,
        "Bills & utilities": 65,
        "Groceries": 420,
        "Restaurants": 500,
        "Pharmacy": 100,
        "Internet": 48,
        "Mobile phone": 28,
        "Music": 12,
        "Pets": 80,
        "Home supplies": 20,
        "Hairdresser": 62,
        "Miscellaneous": 350,
        "Gym": 27
    });

    const value = {
        budget,
        setBudget
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
};

export default BudgetContextProvider;