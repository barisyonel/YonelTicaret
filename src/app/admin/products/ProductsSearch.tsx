'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

interface Props {
  initialSearch?: string;
}

export default function ProductsSearch({ initialSearch = '' }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function - 500ms gecikme ile arama yapar
  const performSearch = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value.trim()) {
      params.set('search', value.trim());
      params.set('page', '1'); // Arama yapıldığında 1. sayfaya dön
    } else {
      params.delete('search');
      params.set('page', '1');
    }
    
    router.push(`/admin/products?${params.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    // İlk render'da search değerini güncelle
    setSearch(initialSearch);
  }, [initialSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Önceki timer'ı temizle
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Yeni timer başlat
    debounceTimer.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };

  useEffect(() => {
    // Component unmount olduğunda timer'ı temizle
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleClear = () => {
    // Timer'ı temizle
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    setSearch('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Ürün adı, açıklama veya kategori ile ara..."
        value={search}
        onChange={handleChange}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: search && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
      />
    </Box>
  );
}

