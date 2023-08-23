import React from 'react';
import { useState } from 'react';
import { Box, IconButton, Typography, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountMenu from './AccountMenu';

function Menu({ ...props }) {
    const { menuId, count, setOpenCart } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClose = () => {
        setAnchorEl(!anchorEl);
    };

    const handleProfileMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    return (
        <>
            <Box sx={{ float: 'right' }}>
                <IconButton aria-label="cart">
                    <Badge badgeContent={1} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography
                    variant="inherit"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        m: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Sản phẩm yêu thích
                </Typography>
                <IconButton
                    aria-label="cart"
                    onClick={() => {
                        setOpenCart(true);
                    }}
                >
                    <Badge badgeContent={count} color="error">
                        <ShoppingBagIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Box>
            <AccountMenu menuId={menuId} anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
        </>
    );
}

export default Menu;
