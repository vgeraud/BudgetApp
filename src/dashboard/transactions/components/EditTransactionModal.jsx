import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
    ButtonGroup, Button, FormControl, FormLabel, Input
} from '@chakra-ui/react'
import { useContext } from 'react';
import TransactionsContext from '../../../contexts/transactions/TransactionsContext';
import { useState, useEffect } from 'react';

const EditTransactionModal = ({ isOpen, onClose, transaction }) => {
    const { updateTransaction } = useContext(TransactionsContext);

    const [editedTransaction, setEditedTransaction] = useState(null);

    useEffect(() => {
        setEditedTransaction(transaction);
    }, [transaction])

    const handleCategoryChange = (e) => {
        setEditedTransaction({ ...editedTransaction, category: e.target.value });
    };

    const handleOnSave = () => {
        updateTransaction(editedTransaction);
        onClose();
    }

    if (!editedTransaction) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Input value={editedTransaction.category ?? ""} onChange={handleCategoryChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button colorScheme="teal" variant='ghost'>Cancel</Button>
                        <Button colorScheme="teal" onClick={handleOnSave}>Save</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTransactionModal;