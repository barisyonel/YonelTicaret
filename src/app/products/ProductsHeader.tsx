'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ProductsFilter from './ProductsFilter';
import { Category } from '@/lib/models/Category';

interface Props {
  categories: Category[];
}

export default function ProductsHeader({ categories }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          Ürünlerimiz
        </Typography>

        {/* Mobile Filter Button */}
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{
            display: { xs: 'flex', md: 'none' },
            borderColor: '#a80000',
            color: '#a80000',
            '&:hover': {
              borderColor: '#8b0000',
              bgcolor: '#fff5f5',
            },
          }}
        >
          Filtrele
        </Button>
      </Box>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: 360,
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            bgcolor: '#a80000',
            color: 'white',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filtreler
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer Content */}
        <Box sx={{ p: 2 }}>
          <ProductsFilter categories={categories} />
        </Box>
      </Drawer>
    </>
  );
}

