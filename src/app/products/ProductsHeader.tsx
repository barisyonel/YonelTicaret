'use client';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSearchParams } from 'next/navigation';

export default function ProductsHeader() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  
  // SEO için dinamik H1
  let h1Text = 'Yedek Parça Kataloğu';
  
  if (search) {
    // Arama terimi varsa özelleştir
    const searchLower = search.toLowerCase();
    if (searchLower.includes('iveco')) {
      h1Text = 'İveco Daily 120-14, 85-12, 65-9, 50NC, Eurobus Yedek Parçaları';
    } else if (searchLower.includes('ducato') || searchLower.includes('fiat')) {
      h1Text = 'Fiat Ducato 2.3 ve 3.0 Yedek Parçaları';
    } else if (searchLower.includes('foton')) {
      h1Text = 'Foton Traktör Yedek Parçaları';
    } else if (searchLower.includes('karataş')) {
      h1Text = 'Karataş Traktör Yedek Parçaları';
    } else if (searchLower.includes('mutlu')) {
      h1Text = 'Mutlu Akü Çeşitleri';
    } else {
      h1Text = `${search} Yedek Parçaları`;
    }
  }

  return (
    <Box sx={{ mb: { xs: '1.5rem', md: '2rem' } }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 800,
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem', lg: '2.5rem' },
          color: '#2c3e50',
          lineHeight: 1.2,
        }}
      >
        {h1Text}
      </Typography>
      {search && (
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 1,
            color: '#666',
            fontSize: { xs: '0.9375rem', md: '1rem' },
          }}
        >
          "{search}" için arama sonuçları
        </Typography>
      )}
    </Box>
  );
}

