import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '~/components/Todo';
import { Box } from '@mui/material';

function Product() {
    const [posts, setPosts] = useState([]);

    const baseURL = 'https://clothesshop.herokuapp.com/api/auth/products';
    // const baseURL = 'https://clothes-shopvn.herokuapp.com/api/auth/products';

    useEffect(() => {
        const getPost = async () => {
            const { data: res } = await axios.get(baseURL);
            setPosts(res);
        };
        getPost();
    }, []);

    if (!posts) return null;

    const getAlldata = () => {
        let datas = [];
        posts.map((value) => {
            const data = {
                id: value.product_id,
                name: value.product_name,
                price: value.price,
                image: value.image_url,
            };
            datas = [...datas, data];
        });
        return datas;
    };

    let todoList = getAlldata();

    const titleProduct = 'Những sản phẩm nổi bật';
    const numberProduct = [3, 12];

    return (
        <>
            <Box sx={{ width: '90%', minHeight: 1000, flexGrow: 1, marginX: 'auto' }}>
                <Todo todoList={todoList} title={titleProduct} number={numberProduct} />
            </Box>
        </>
    );
}

export default Product;
