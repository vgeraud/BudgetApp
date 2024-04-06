import { useContext } from "react";
import BudgetContext from "../../contexts/budget/BudgetContext";
import { Stack, Progress, Heading, Flex, Text, Divider, Box } from '@chakra-ui/react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import TransactionsContext from "../../contexts/transactions/TransactionsContext";

const BudgetSummary = () => {
    const { budget } = useContext(BudgetContext);
    const { transactions: allTransactions } = useContext(TransactionsContext);
    const transactions = allTransactions.filter(transaction => !transaction.isIgnored);

    const categories = Object.keys(budget);
    const unbudgetedCategories = transactions
        .map(x => x.category)
        .filter((x, index, array) => !categories.includes(x) && array.indexOf(x) === index && x !== "Salary");

    const getTotalForCategory = (category) => transactions
        .filter(transaction => transaction.category === category)
        .reduce((acc, transaction) => acc + Number(transaction.debit) - Number(transaction.credit), 0);

    const toCurrency = (amount) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });

        return formatter.format(amount);
    }

    const income = getTotalForCategory("Salary");
    
    const expenses = transactions
        .filter(transaction => transaction.category !== "Salary")
        .reduce((acc, transaction) => acc + Number(transaction.debit) - Number(transaction.credit), 0);

    const totalBudgeted = categories.reduce((acc, category) => acc + budget[category], 0);

    return (
        <>
            <Stack gap={5}>
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading size="sm">Income</Heading>
                        <Text fontSize="sm" fontWeight={700}>{toCurrency(income * -1)}</Text>
                    </Flex>

                    <Progress size="sm" max={6000} value={income} colorScheme="teal" />
                </Stack>
                <Divider />
                <Flex justifyContent="space-between">
                    <Heading size="md">Expenses</Heading>
                    <Text fontSize="md" fontWeight={700}>{`${toCurrency(expenses)} of ${toCurrency(totalBudgeted)}`}</Text>
                </Flex>
                <Divider />
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
                })}
            </Stack>
            <Accordion allowToggle marginTop={6}>
                <AccordionItem>
                    <AccordionButton paddingStart={0}>
                        <Box as="span" flex='1' textAlign='left'>
                            <Heading size="md">Others</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        {unbudgetedCategories.map(category => {
                            const totalSpent = getTotalForCategory(category);

                            return (
                                <Stack key={category}>
                                    <Flex justifyContent="space-between">
                                        <Heading size="sm">{category}</Heading>
                                        <Text fontSize="sm">{toCurrency(totalSpent)}</Text>
                                    </Flex>
                                </Stack>
                            )
                        })}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
}

export default BudgetSummary;