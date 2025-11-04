import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} sx={{ color: '#a80000' }} />
      <Typography variant="body1" color="text.secondary">
        Ürün detayları yükleniyor...
      </Typography>
    </Box>
  );
}

