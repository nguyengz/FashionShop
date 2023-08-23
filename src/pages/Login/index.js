import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { login } from '~/slices/auth';
import { clearMessage } from '~/slices/message';

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
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
const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {                
                navigate('/dangnhap');
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
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
                            username: '',
                            password: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().max(255).required('username is required'),
                            password: Yup.string().max(255).required('Password is required'),
                        })}
                        onSubmit={handleLogin}
                    >
                        {({ errors, handleBlur, handleChange, touched, values }) => (
                            <Form noValidate>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="username-login">username</InputLabel>
                                            <OutlinedInput
                                                id="username-login"
                                                type="text"
                                                value={values.username}
                                                name="username"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
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
                                            <InputLabel htmlFor="password-login">Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="-password-login"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="Enter password"
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} sx={{ mt: -1 }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={(event) => setChecked(event.target.checked)}
                                                        name="checked"
                                                        color="primary"
                                                        size="small"
                                                    />
                                                }
                                                label={
                                                    <Typography variant="h6" fontSize={15}>
                                                        Keep me sign in
                                                    </Typography>
                                                }
                                            />
                                            <Link
                                                variant="h6"
                                                component={RouterLink}
                                                to=""
                                                color="text.primary"
                                                fontSize={15}
                                            >
                                                Forgot Password?
                                            </Link>
                                        </Stack>
                                    </Grid>
                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Button
                                            disableElevation
                                            disabled={loading}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    
                    {/* {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )} */}
                </Paper>
            </Grid>
        </Container>

        // <div className="col-md-12 login-form">
        //   <div className="card card-container">
        //     <Formik
        //       initialValues={initialValues}
        //       validationSchema={validationSchema}
        //       onSubmit={handleLogin}
        //     >
        //       <Form>
        //         <div className="form-group">
        //           <label htmlFor="username">Username</label>
        //           <Field name="username" type="text" className="form-control" />
        //           <ErrorMessage
        //             name="username"
        //             component="div"
        //             className="alert alert-danger"
        //           />
        //         </div>

        //         <div className="form-group">
        //           <label htmlFor="password">Password</label>
        //           <Field name="password" type="password" className="form-control" />
        //           <ErrorMessage
        //             name="password"
        //             component="div"
        //             className="alert alert-danger"
        //           />
        //         </div>

        //         <div className="form-group">
        //           <button
        //             type="submit"
        //             className="btn btn-primary btn-block"
        //             disabled={loading}
        //           >
        //             {loading && (
        //               <span className="spinner-border spinner-border-sm"></span>
        //             )}
        //             <span>Login</span>
        //           </button>
        //         </div>
        //       </Form>
        //     </Formik>
        //   </div>

        // {message && (
        //   <div className="form-group">
        //     <div className="alert alert-danger" role="alert">
        //       {message}
        //     </div>
        //   </div>
        // )}
        // </div>
    );
};

export default Login;
