import { useContext } from "react";
import TransactionsContext from "../../contexts/transactions/TransactionsContext";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure
} from '@chakra-ui/react'
import { EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import EditTransactionModal from "./components/EditTransactionModal";
import { useState } from "react";

const supportedHeaders = ['date', 'description', 'category', 'debit', 'credit'];

const TransactionsTable = () => {
    const { transactions, updateTransaction } = useContext(TransactionsContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleClickVisibility = (transaction) => {
        updateTransaction({ ...transaction, isIgnored: !transaction.isIgnored });
    };

    const handleClickEdit = (transaction) => {
        setSelectedTransaction(transaction);
        onOpen();
    };

    const handleCloseModal = () => {
        setSelectedTransaction(null);
        onClose();
    };

    const headers = Object.keys(transactions[0]).filter(x => supportedHeaders.includes(x));
    const sortedTransaction = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            {headers.map((header) => <Th key={header}>{header}</Th>)}
                            <Th colSpan={2} />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedTransaction.map((transaction) =>
                            <Tr key={transaction.id} color={transaction.isIgnored ? "lightgray" : "black"}>
                                <Td>{transaction.date}</Td>
                                <Td>{transaction.description}</Td>
                                <Td>{transaction.category}</Td>
                                <Td>{transaction.debit}</Td>
                                <Td>{transaction.credit}</Td>
                                <Td cursor="pointer" onClick={() => handleClickEdit(transaction)}>
                                    <EditIcon color="gray" />
                                </Td>
                                <Td onClick={() => handleClickVisibility(transaction)} cursor="pointer">
                                    {transaction.isIgnored
                                        ? <ViewIcon color="teal" />
                                        : <ViewOffIcon color="gray" />
                                    }
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <EditTransactionModal isOpen={isOpen} onClose={handleCloseModal} transaction={selectedTransaction} />
        </>
    );
};

export default TransactionsTable;