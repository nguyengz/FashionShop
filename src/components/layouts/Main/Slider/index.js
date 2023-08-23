import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

function Slider() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Box
                sx={{
                    width: 'auto',
                    minHeight: matches? 1000: 200,
                    backgroundImage: 'url(https://levents.asia/wp-content/uploads/2023/01/website-1920x988-1.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
            </Box>
        </>
    );
}

export default Slider;
