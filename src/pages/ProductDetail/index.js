import {
    Grid,
    Typography,
    Button,
    MenuItem,
    InputLabel,
    FormControl,
    Rating,
    Select,
    Box,
    ButtonGroup,
    OutlinedInput,
    useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '~/slices/cartSlice';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
function ProductDetail(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const { user: currentUser } = useSelector((state) => state.auth);
    const [userId, setUserId] = useState(currentUser ? currentUser.id : '');
    const [quantity, setquantity] = useState(1);
    const [sizeProduct, setsizeProduct] = useState('');
    const { productId } = useParams();
    const dispatch = useDispatch();
    //const baseURL = 'https://clothesshop.herokuapp.com/api/auth/products/${productId}';
    const baseURL = `https://clothes-shopvn.herokuapp.com/api/auth/products/${productId}`;
    // const baseURL = `https://clothes-shopvn.herokuapp.com/api/auth/CartItems`;

    useEffect(() => {
        const getPost = async () => {
            const { data: res } = await axios.get(baseURL);
            setPosts(res);
        };
        getPost();
    }, []);

    if (!posts) return null;

    const handleChange = (e) => {
        e.preventDefault();
    };

    const handleAddToCart = (product) =>{
        dispatch(addToCart(product));
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    margin: 'auto',
                    marginTop: 10,
                    maxWidth: 1000,
                    maxHeight: 1000,
                }}
            >
                <Formik
                    initialValues={{
                        quantity: 1,
                        sizeProduct: '',
                    }}
                >
                    <Form>
                        <Grid container spacing={3} direction={matches ? 'row' : 'column'}>
                            <Grid item xs={matches ? 6 : 12} container sx={{ marginX: 'auto' }}>
                                <ButtonBase sx={{ width: 400, height: 400, marginX: 'auto' }}>
                                    <Img src={posts.image_url}></Img>
                                </ButtonBase>
                                <Grid container direction={'row'} sx={{ margin: 1 }}>
                                    <Box sx={{ marginX: 'auto' }}>
                                        <ButtonBase sx={{ width: 80, height: 100 }}>
                                            <Img src={posts.image_url} sx={{ margin: 0 }}></Img>
                                        </ButtonBase>
                                        <ButtonBase sx={{ width: 80, height: 100 }}>
                                            <Img src={posts.image_url} sx={{ margin: 0 }}></Img>
                                        </ButtonBase>
                                        <ButtonBase sx={{ width: 80, height: 100 }}>
                                            <Img src={posts.image_url} sx={{ margin: 0 }}></Img>
                                        </ButtonBase>
                                        <ButtonBase sx={{ width: 80, height: 100 }}>
                                            <Img src={posts.image_url} sx={{ margin: 0 }}></Img>
                                        </ButtonBase>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item xs={matches ? 6 : 12} container>
                                <Grid item container direction="column">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h4">
                                            {posts.product_name}
                                        </Typography>
                                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        <Typography variant="body2">Full resolution 1920x1080 • JPEG</Typography>
                                        <Typography variant="inherit" fontSize={25} color={'common.blue'} gutterBottom>
                                            ${posts.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl sx={{ m: 1 }} required>
                                            <InputLabel id="demo-select-small">Size</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={sizeProduct}
                                                label="Size"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setsizeProduct(e.target.value);
                                                }}
                                                defaultValue={'M'}
                                                sx={{ width: 80 }}
                                            >
                                                <MenuItem value={'M'}>M</MenuItem>
                                                <MenuItem value={'L'}>L</MenuItem>
                                                <MenuItem value={'XL'}>XL</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
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
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        marginBottom: 1,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            currentUser ? handleAddToCart(posts) : navigate('/dangnhap');
                                        }}
                                    >
                                        THÊM VÀO GIỎ HÀNG
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
                <Grid item></Grid>
            </Paper>
        </>
    );
}

export default ProductDetail;
