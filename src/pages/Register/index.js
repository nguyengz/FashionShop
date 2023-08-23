import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { register } from '~/slices/auth';
import { clearMessage } from '~/slices/message';

import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Box,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Paper,
    Container,
} from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { strengthColor, strengthIndicator } from '~/utils/password-strength';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [level, setLevel] = useState();
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
        changePassword('');
    }, [dispatch]);
    // useEffect(() => {
    //   changePassword("");
    // }, []);

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };
    const handleRegister = (formValue) => {
        const { name, username, email, password, address, roles } = formValue;
        setSuccessful(true);
        dispatch(register({ name, username, email, password, address, roles }))
            .unwrap()
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                setSuccessful(false);
            });
    };
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Container maxWidth="xs">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent={'center'}
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
                style={{ minHeight: '100vh' }}
            >
                <Paper elelvation={2} sx={{ padding: 5 }}>
                    <Formik
                        initialValues={{
                            name: '',
                            username: '',
                            email: '',
                            password: '',
                            address: '',
                            roles: ['ADMIN'],
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().max(255).required('name is required'),
                            username: Yup.string().max(255).required('username is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string()
                                .min(5)
                                .max(255)
                                .matches(/(?=.*[0-9])/, 'Phải chứa số')
                                .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'phai co chu ')
                                .required('Password is required'),
                        })}
                        onSubmit={handleRegister}
                    >
                        {({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
                            <Form>
                                {!successful && (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="name-login">Name</InputLabel>
                                                <OutlinedInput
                                                    id="username-login"
                                                    type="text"
                                                    value={values.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter name"
                                                    fullWidth
                                                    error={Boolean(touched.name && errors.name)}
                                                />
                                                {touched.name && errors.name && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.name}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="username-login">username</InputLabel>
                                                <OutlinedInput
                                                    id="username-login"
                                                    type="text"
                                                    value={values.username}
                                                    name="username"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        changePassword(e.target.value);
                                                    }}
                                                    placeholder="Enter username"
                                                    fullWidth
                                                    error={Boolean(touched.username && errors.username)}
                                                />
                                                {touched.username && errors.username && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.username}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="email-res">Email</InputLabel>
                                                <OutlinedInput
                                                    id="email-res"
                                                    type="email"
                                                    value={values.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter email"
                                                    fullWidth
                                                    error={Boolean(touched.email && errors.email)}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="password-login">Password</InputLabel>
                                                <OutlinedInput
                                                    fullWidth
                                                    error={Boolean(touched.password && errors.password)}
                                                    id="-password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        changePassword(e.target.value);
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOutlined />
                                                                ) : (
                                                                    <EyeInvisibleOutlined />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder="Enter password"
                                                    inputProps={{}}
                                                />
                                                {touched.password && errors.password && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-password-login"
                                                    >
                                                        {errors.password}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                            <FormControl fullWidth sx={{ mt: 2 }}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <Box
                                                            sx={{
                                                                bgcolor: level?.color,
                                                                width: 85,
                                                                height: 8,
                                                                borderRadius: '7px',
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                                            {level?.label}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="adr-res">Adress</InputLabel>
                                                <OutlinedInput
                                                    id="address-res"
                                                    type="address"
                                                    value={values.address}
                                                    name="address"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter address"
                                                    fullWidth
                                                    error={Boolean(touched.address && errors.address)}
                                                />
                                                {touched.address && errors.address && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-address-login"
                                                    >
                                                        {errors.address}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Create Account
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Paper>
                {message && alert(message)}
            </Grid>
        </Container>
        // <div className="col-md-12 signup-form">
        //   <div className="card card-container">
        //     <img
        //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        //       alt="profile-img"
        //       className="profile-img-card"
        //     />
        //     <Formik
        //       initialValues={initialValues}
        //       validationSchema={validationSchema}
        //       onSubmit={handleRegister}
        //     >
        //       <Form>
        //         {!successful && (
        //           <div>
        //             <div className="form-group">
        //               <label htmlFor="username">Username</label>
        //               <Field name="username" type="text" className="form-control" />
        //               <ErrorMessage
        //                 name="username"
        //                 component="div"
        //                 className="alert alert-danger"
        //               />
        //             </div>

        //             <div className="form-group">
        //               <label htmlFor="email">Email</label>
        //               <Field name="email" type="email" className="form-control" />
        //               <ErrorMessage
        //                 name="email"
        //                 component="div"
        //                 className="alert alert-danger"
        //               />
        //             </div>

        //             <div className="form-group">
        //               <label htmlFor="password">Password</label>
        //               <Field
        //                 name="password"
        //                 type="password"
        //                 className="form-control"
        //               />
        //               <ErrorMessage
        //                 name="password"
        //                 component="div"
        //                 className="alert alert-danger"
        //               />
        //             </div>

        //             <div className="form-group">
        //               <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        //             </div>
        //           </div>
        //         )}
        //       </Form>
        //     </Formik>
        //   </div>

        //   {message && (
        //     <div className="form-group">
        //       <div
        //         className={successful ? "alert alert-success" : "alert alert-danger"}
        //         role="alert"
        //       >
        //         {message}
        //       </div>
        //     </div>
        //   )}
        // </div>
    );
};

export default Register;
