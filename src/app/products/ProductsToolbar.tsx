'use client';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter, useSearchParams } from 'next/navigation';
import SortIcon from '@mui/icons-material/Sort';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

export default function ProductsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get('sort') || 'newest';
  const currentLimit = searchParams.get('limit') || '12';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.delete('page'); // Reset to first page
    router.push(`/products?${params.toString()}`);
  };

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', value);
    params.delete('page'); // Reset to first page
    router.push(`/products?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
    >
      {/* Sıralama */}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="sort-label">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SortIcon fontSize="small" />
            Sırala
          </Box>
        </InputLabel>
        <Select
          labelId="sort-label"
          value={currentSort}
          label="Sırala"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <MenuItem value="newest">En Yeni</MenuItem>
          <MenuItem value="oldest">En Eski</MenuItem>
          <MenuItem value="name-asc">İsim (A-Z)</MenuItem>
          <MenuItem value="name-desc">İsim (Z-A)</MenuItem>
        </Select>
      </FormControl>

      {/* Sayfa Başına Ürün Sayısı */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="limit-label">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ViewModuleIcon fontSize="small" />
            Göster
          </Box>
        </InputLabel>
        <Select
          labelId="limit-label"
          value={currentLimit}
          label="Göster"
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <MenuItem value="12">12 Ürün</MenuItem>
          <MenuItem value="24">24 Ürün</MenuItem>
          <MenuItem value="48">48 Ürün</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

