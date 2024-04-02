import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, AttachmentIcon, SettingsIcon } from '@chakra-ui/icons'
import { useRef, useContext } from 'react';
import { parseCSVtoJSON } from '../../utils/parser';
import TransactionsContext from '../../contexts/transactions/TransactionsContext';

const Menu = () => {
    const inputRef = useRef(null);
    const { saveTransactions } = useContext(TransactionsContext);

    const handleClickImport = () => {
        inputRef.current.click();
    };

    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        parseCSVtoJSON(file, saveTransactions);

    };

    return (
        <ChakraMenu>
            <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <MenuList>
                <MenuItem icon={<AttachmentIcon />} onClick={handleClickImport}>Import by CSV</MenuItem>
                <MenuItem icon={<SettingsIcon />}>Define budget</MenuItem>
            </MenuList>
            <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleSelectFile} />
        </ChakraMenu>
    );
}

export default Menu;