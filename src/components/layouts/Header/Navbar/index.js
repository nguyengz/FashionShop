import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Narbar({ ...props }) {
    const { titlePages } = props;

    const [value, setValue] = useState(titlePages[0].id);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} sx={{ width: '90%', marginX: 'auto', textAlign: 'center', padding: 1 }}>
                    {titlePages.map((page) => {
                        return (
                            <Grid item xs={12 / titlePages.length} key={page.id}>
                                <Typography
                                    variant="body1"
                                    component={Link}
                                    to={`/${page.id}`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: value === page.id ? '#000' : 'rgba(0,0,0,0.5)',
                                        '&:hover': {
                                            color: '#000000',
                                        },
                                    }}
                                    onChange={(e) => setValue(page.id)}
                                >
                                    {page.title}
                                </Typography>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
}

export default Narbar;
