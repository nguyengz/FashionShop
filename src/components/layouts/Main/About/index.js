import * as React from 'react';
import { TextField, Box, Button, Stack, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Maps from './Maps';

const About = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Bạn cần nhập họ và tên').min(3, 'Họ tên ít nhất có 3 ký tự'),
            email: yup.string().required('Địa chỉ Email không được trống').email('Sai định dạng Email'),
            phone: yup
                .string()
                .required('Cho chúng tôi xin số điện thoại để tiện trao đổi!')
                .matches(/^[0-9]{10,11}$/, 'Sai định dạng số điện thoại'),
            message: yup.string().min(10, 'Những góp ý quá ít'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={matches ? 6 : 12}>
                <Maps />
            </Grid>
            <Grid item xs={matches ? 6 : 12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
                    <Typography variant="h6" component={'h6'}>
                        Gửi tin nhắn ngay cho chúng tôi <br /> Khi bạn cần hỗ trợ hoặc có thắc mắc nhé!{' '}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <TextField
                                label="Họ và tên"
                                variant="outlined"
                                size="small"
                                fullWidth
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                label="Số điện thoại"
                                variant="outlined"
                                size="small"
                                fullWidth
                                id="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Địa chỉ email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Ghi chú"
                        variant="outlined"
                        size="small"
                        fullWidth
                        id="message"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={formik.touched.message && Boolean(formik.errors.message)}
                        helperText={formik.touched.message && formik.errors.message}
                        multiline
                        rows={4}
                    />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" type="submit" onClick={formik.handleSubmit}>
                            Submit
                        </Button>
                        <Button variant="contained" onClick={formik.handleReset}>
                            Reset
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default About;
