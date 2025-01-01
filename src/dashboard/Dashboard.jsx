import { Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Heading } from '@chakra-ui/react'
import { useContext } from 'react';
import TransactionsContext from '../contexts/transactions/TransactionsContext';
import TransactionsTable from './transactions/TransactionsTable';
import BudgetSummary from './budget/BudgetSummary';
import Menu from './components/Menu';
import DatePicker from './components/DatePicker';

const Dashboard = () => {
    const { transactions } = useContext(TransactionsContext);

    return (
        <Stack gap={5}>
            <Flex justifyContent="space-between" alignItems="center">
                <Heading color="teal">BudgetApp</Heading>
                <Flex marginLeft="auto">
                    <DatePicker marginRight="8px" minWidth="200px" />
                    <Menu />
                </Flex>
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