import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ProductsRepository from '@/lib/repositories/ProductsRepository';
import ProductsTable from './ProductsTable';
import ProductsSearch from './ProductsSearch';
import ProductsPagination from './ProductsPagination';

// Force dynamic rendering to avoid build-time database connection
export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const page = parseInt((searchParams.page as string) || '1');
  const limit = 100; // Her sayfada 100 ürün
  const search = (searchParams.search as string) || '';
  
  const { products, total } = await ProductsRepository.findAll({ 
    page,
    limit,
    search: search || undefined,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Ürün Yönetimi
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Toplam {total} ürün {search && `(Arama: "${search}")`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/admin/products/create"
        >
          Yeni Ürün
        </Button>
      </Box>

      {/* Arama Input */}
      <Box sx={{ mb: 3 }}>
        <ProductsSearch initialSearch={search} />
      </Box>

      {/* Ürün Tablosu */}
      <ProductsTable products={products} />

      {/* Sayfalama */}
      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <ProductsPagination 
            currentPage={page} 
            totalPages={totalPages}
            search={search}
          />
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <Button component={Link} href="/admin" variant="outlined">
          ← Panele Dön
        </Button>
      </Box>
    </Container>
  );
}

