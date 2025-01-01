import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import TransactionsContext from '../../contexts/transactions/TransactionsContext';

const DatePicker = ({ ...props }) => {
    const { transactions, selectedMonth, setSelectedMonth } = useContext(TransactionsContext);

    if (!transactions || transactions.length === 0) {
        return null;
    }

    const dates = transactions
        .map(transaction => {
            const date = new Date(transaction.date);
            const displayedLabel = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

            return {
                year: date.getFullYear(),
                month: date.getMonth(),
                displayedLabel
            }
        })
        .filter((date, index, self) => self.findIndex(x => x.year === date.year) === index);

    return (
        <Select {...props} defaultValue={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {dates.map((date, index) => (
                <option key={index} value={date}>{date.displayedLabel}</option>
            ))}
        </Select>
    )
};

export default DatePicker;