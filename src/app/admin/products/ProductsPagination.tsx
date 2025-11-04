'use client';

import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
}

export default function ProductsPagination({ currentPage, totalPages, search }: Props) {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    router.push(`/admin/products${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '1rem',
          },
        }}
      />
      <Typography variant="body2" color="text.secondary">
        Sayfa {currentPage} / {totalPages}
      </Typography>
    </Box>
  );
}

