import { useContext } from "react";
import BudgetContext from "../../contexts/budget/BudgetContext";
import { Stack, Progress, Heading, Flex, Text } from '@chakra-ui/react'
import TransactionsContext from "../../contexts/transactions/TransactionsContext";

const BudgetSummary = () => {
    const { budget } = useContext(BudgetContext);
    const { transactions } = useContext(TransactionsContext);

    const categories = Object.keys(budget);

    const getTotalForCategory = (category) => transactions
        .filter(transaction => transaction.category === category)
        .filter(transaction => !transaction.isIgnored)
        .reduce((acc, transaction) => acc + Number(transaction.debit) - Number(transaction.credit), 0);

    const toCurrency = (amount) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });

        return formatter.format(amount);
    }

    return (
        <Stack gap={5}>
            {categories.map(category => {
                const totalSpent = getTotalForCategory(category);
                const budgetRatio = totalSpent / budget[category] * 100;
                var color = budgetRatio >= 100 ? "red" : budgetRatio >= 80 ? "orange" : "teal";

                return (
                    <Stack key={category}>
                        <Flex justifyContent="space-between">
                            <Heading size="sm">{category}</Heading>
                            <Text fontSize="sm">{`${toCurrency(totalSpent)} of ${toCurrency(budget[category])}`}</Text>
                        </Flex>

                        <Progress size="sm" max={100} value={budgetRatio} colorScheme={color} />
                    </Stack>
                )
            }

            )}
        </Stack>
    );
}

export default BudgetSummary;