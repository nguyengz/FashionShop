import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from '~/components/Todo';

function Home() {
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
        // eslint-disable-next-line array-callback-return
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
    const numberProduct = [3, 12, 8];

    return (
        <>
            {/* <Todo todoList={todoList} title={titleProduct} number={numberProduct} /> */}
        </>
    );
}

export default Home;
