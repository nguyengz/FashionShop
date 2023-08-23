import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <hr />
            <Box sx={{ flexGrow: 1, width: 'auto', height: 300, marginTop: 16 }}>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Box sx={{ padding: 1, textTransform: 'uppercase' }}>
                            <Typography variant="h5" component={'h5'}>
                                Về chúng tôi
                            </Typography>
                            <Typography variant="h6" component={'h6'} sx={{ marginTop: 1, color: 'rgba(0,0,0,0.5)' }}>
                                Các thành viên nhóm 2
                            </Typography>
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                                    Đặng Thái Sơn - DH51904373
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                                    Dương Ngọc Nguyên - DH51900713
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                                    Lê Ngọc Huy - DH51900268
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                                    Huỳnh Thanh Vỉ - DH51900990
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="" sx={{ marginBottom: 3 }}>
                            LIÊN HỆ
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', marginBottom: 0.25 }}>
                            dh51904373@student.stu.edu.vn
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', marginBottom: 0.25 }}>
                            dh51900713@student.stu.edu.vn
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', marginBottom: 0.25 }}>
                            dh51900268@student.stu.edu.vn
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', marginBottom: 0.25 }}>
                            dh51900990@student.stu.edu.vn
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="" sx={{ marginBottom: 3 }}>
                            DANH MỤC SẢN PHẨM
                        </Typography>
                        <Box>
                            <Typography
                                variant="body1"
                                component={Link}
                                to='/'
                                sx={{ textDecoration: 'none', color: 'rgba(0,0,0,0.5)', '&:hover': {color: '#000'} }}
                            >
                                Áo
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6" component="" sx={{}}>
                            HỖ TRỢ
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(0,0,0,0.5)', marginBottom: 0.25 }}>
                            Nếu có lỗi hiển thị sẵn phẩm xin liên hệ: Dương Ngọc Nguyên
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{ width: 'auto', lineHeight: 50, backgroundColor: '#d6d6d6', padding: 1, display: 'flex', textTransform: 'uppercase' }}
                alignContent="center"
            >
                <Typography variant="body1" component="" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                    Website bán áo của nhóm 2
                </Typography>
                <Typography
                    variant="body1"
                    component=""
                    sx={{ color: 'rgba(0,0,0,0.5)', marginLeft: 'auto', marginRight: 1 }}
                >
                    Tuyển dụng
                </Typography>
            </Box>
        </>
    );
}

export default Footer;
