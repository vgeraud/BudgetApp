import { Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Heading } from '@chakra-ui/react'
import { useContext } from 'react';
import TransactionsContext from '../contexts/transactions/TransactionsContext';
import TransactionsTable from './transactions/TransactionsTable';
import BudgetSummary from './budget/BudgetSummary';
import Menu from './components/Menu';

const Dashboard = () => {
    const { transactions } = useContext(TransactionsContext);

    return (
        <Stack gap={5}>
            <Flex justifyContent="space-between">
                <Heading color="teal">BudgetApp</Heading>
                <Menu />
            </Flex>
            {transactions?.length > 0 &&
                <Tabs>
                    <TabList>
                        <Tab>Transactions</Tab>
                        <Tab>Budget</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <TransactionsTable />
                        </TabPanel>
                        <TabPanel>
                            <BudgetSummary />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            }
        </Stack>
    );
};

export default Dashboard;