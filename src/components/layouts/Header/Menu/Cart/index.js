import React, { useRef, useState } from 'react';
import { Box, Button, ButtonGroup, InputLabel, OutlinedInput } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import classNames from 'classnames/bind';
import styles from './cart.module.scss';
import { number } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '~/slices/cartSlice';

const cx = classNames.bind(styles);
const cartmodal = (e) => {
    e.stopPropagation();
};
function Cart({ closeCart }) {
    const [quantity, setquantity] = useState(1);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };
    const cartt = useRef();

    const handleChange = (e) => {
        e.preventDefault();
    };
    
    return (
        <div className={cx('modal')} onClick={() => closeCart(false)}>
            <div className={cx('cart-container')} onClick={cartmodal} ref={cartt}>
                <div className={cx('cart-modal')}>
                    <div className={cx('cart-header')}>
                        <div className={cx('title-cart')}>
                            {' '}
                            <h2>Giỏ hàng</h2>
                        </div>
                        <div className={cx('close')} onClick={() => closeCart(false)}>
                            {' '}
                            Đóng
                        </div>
                    </div>

                    <hr></hr>
                    {cart.cartItems.length === 0 ? (
                        <div className={cx('cart-empty')}>
                            <p>Giỏ hàng trống</p>
                        </div>
                    ) : (
                        <div className={cx('cart-list')}>
                            {cart.cartItems?.map((cartItem) => (
                                <div className={cx('cart-item')} key={cartItem.product_id}>
                                    <div className={cx('cart-img')}>
                                        <img className={cx('img-item')} src={cartItem.image_url} alt="hinh"></img>
                                    </div>
                                    <div className={cx('cart-info')}>
                                        <div>{cartItem.product_name}</div>
                                        <div>{cartItem.size_name}</div>
                                        <div>
                                            <Box
                                                sx={{
                                                    color: 'action.active',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    m: 1,
                                                }}
                                            >
                                                <InputLabel variant="standard" value="sss">
                                                    {' '}
                                                    Số lượng{' '}
                                                </InputLabel>
                                                <OutlinedInput
                                                    readOnly
                                                    sx={{ width: 100 }}
                                                    id="username-login"
                                                    value={quantity}
                                                    name="quantity"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setquantity(e.target.value);
                                                    }}
                                                />

                                                <ButtonGroup>
                                                    <Button
                                                        aria-label="reduce"
                                                        onClick={() => {
                                                            setquantity(Math.max(quantity - 1, 0));
                                                        }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </Button>
                                                    <Button
                                                        aria-label="increase"
                                                        onClick={() => {
                                                            setquantity(quantity + 1);
                                                        }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </Button>
                                                </ButtonGroup>
                                            </Box>
                                            <Button onClick={() => handleRemoveFromCart(cartItem)}>Xóa</Button>

                                            <div>${cartItem.price * cartItem.cartQuantity}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr></hr>
                    <div className={cx('cart-total')}>
                        <div className={cx('cart-sub')}>Tạm tính</div>
                        <div className={cx('total')}>${cart.cartTotalAmount}</div>
                    </div>
                    <div className={cx('des-cart')}>Các loại chi phí khác được tính trong phần thanh toán</div>
                    <div className={cx('btn-cart')}>
                        <button>Thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
