import React, { useCallback, useEffect, useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/slices/auth';
import EventBus from '~/common/EventBus';
import { Link } from 'react-router-dom';

function AccountMenu({ ...props }) {
    const { menuId, anchorEl, handleMenuClose } = props;

    const isMenuOpen = Boolean(anchorEl);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            EventBus.remove('logout');
        };
    }, [currentUser, logOut]);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>
                    {currentUser ? (
                        <p>{currentUser.name}</p>
                    
                    ) : (
                        <Typography
                            variant="body1"
                            component={Link}
                            to="/dangnhap"
                            color={'inherit'}
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#000000',
                                },
                            }}
                        >
                            Đăng nhập
                        </Typography>
                    )}
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    {currentUser ? (
                        <p onClick={logOut}>Đăng xuất</p>
                    ) : (
                        <Typography
                            variant="body1"
                            component={Link}
                            to="/dangky"
                            color={'inherit'}
                            sx={{
                                textDecoration: 'none',
                                '&:hover': {
                                    color: '#000000',
                                },
                            }}
                        >
                            Đăng ký
                        </Typography>
                    )}
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;
