import Home from "~/pages/Home";
import Product from "~/pages/Product";
import Found404 from "~/pages/Found404";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import ProductDetail from "~/pages/ProductDetail";

const publicRoutes = [
    { path: '/', component: Home, },
    { path: '/product', component: Product, layout: 'onlylayout' },
    { path: '/found404', component: Found404, layout: 'onlylayout' },
    { path: '/chitietsanpham/:productId', component: ProductDetail, layout: 'onlylayout' },
    
    {path: '/dangnhap', component: Login, layout: 'onlylayout'},
    {path: '/dangky', component: Register, layout: 'onlylayout'},
];

const privateRoutes = [
];

export {publicRoutes, privateRoutes};