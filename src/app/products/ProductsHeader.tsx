'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProductsHeaderProps {
  title?: string;
}

export default function ProductsHeader({ title = 'Ürünler' }: ProductsHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
    </Box>
  );
}

