import { Card, CardContent, Box, Skeleton } from '@mui/material';

export default function ProductCardSkeleton() {
  return (
    <Card sx={{ height: '100%' }}>
      {/* Image skeleton */}
      <Skeleton variant="rectangular" height={240} />
      
      <CardContent>
        {/* Category chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
        </Box>
        
        {/* Title */}
        <Skeleton variant="text" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={28} width="60%" />
        
        {/* Description */}
        <Skeleton variant="text" height={20} sx={{ mt: 2 }} />
        <Skeleton variant="text" height={20} />
        
        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="rectangular" height={36} sx={{ flex: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={36} height={36} sx={{ borderRadius: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
}

