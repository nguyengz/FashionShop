import React, { useState } from 'react';
import { AppBar, Grid, Paper, styled, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import NavMobile from './Navbar/NavMobile';
import Menu from './Menu';
import MenuMobile from './Menu/MenuMobile';
import Cart from './Menu/Cart';
import { useSelector } from 'react-redux';

const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

const titlePages = [
    { id: '', title: 'Trang chủ' },
    { id: 'product', title: 'Sản phẩm' },
];

function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const cart = useSelector((state) => state.cart);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [openCart, setOpenCart] = useState(false);

    return (
        <>
            {openCart && <Cart closeCart={setOpenCart}></Cart>}
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <Grid container spacing={4}>
                        <Grid item xs>
                            <NavMobile titlePages={titlePages} />
                        </Grid>
                        <Grid item xs>
                            <Item elevation={0}>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                    }}
                                >
                                    NHÓM 2
                                </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Item elevation={0} sx={{ padding: 0 }}>
                                {matches ? (
                                    <Menu menuId={menuId} count={cart.cartItems.length} setOpenCart={setOpenCart} />
                                ) : (
                                    <MenuMobile
                                        menuId={mobileMenuId}
                                        count={cart.cartItems.length}
                                        setOpenCart={setOpenCart}
                                    />
                                )}
                            </Item>
                        </Grid>
                    </Grid>
                </Toolbar>
                {matches ? <Navbar titlePages={titlePages} /> : null}
            </AppBar>
        </>
    );
}

export default Header;
