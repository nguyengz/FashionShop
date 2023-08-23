import React, { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function NavMobile({ ...props }) {
    const { titlePages } = props;

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Drawer open={isOpen} onClose={() => setIsOpen(!isOpen)}>
                <IconButton sx={{ marginLeft: 'auto' }} onClick={() => setIsOpen(false)}>
                    <ClearIcon />
                </IconButton>
                <List>
                    {titlePages.map((page) => {
                        return (
                            <ListItem
                                key={page.id}
                                component={Link}
                                to={`/${page.id}`}
                                sx={{ color: 'rgba(0,0,0,0.5)' }}
                                onClick={() => setIsOpen(false)}
                            >
                                {page.title}
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => setIsOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </>
    );
}

export default NavMobile;
