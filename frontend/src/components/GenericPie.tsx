import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';
import type { ChartDatum } from '../interfaces/chartDatum';
import { AdvancedPieProps } from '../interfaces/advancedPieProps';

const StyledText = styled('text')(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontWeight: 600,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function GenericPie({
  mainData,
  middleData,
  outerData,
  title,
  centerLabel,
}: AdvancedPieProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600–900px

  // Ajuste les rayons selon la taille d’écran
  const innerRadius = isMobile ? 30 : isTablet ? 50 : 60;
  const middleRadius = isMobile ? 70 : isTablet ? 100 : 130;
  const outerRadius = isMobile ? 110 : isTablet ? 150 : 200;

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        p: { xs: 1, sm: 2 },
      }}
    >
      {title && (
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: isMobile ? 320 : isTablet ? 420 : 500,
          width: '100%',
        }}
      >
        <PieChart
          series={[
            {
              innerRadius,
              outerRadius: middleRadius,
              data: mainData,
              arcLabel: (item) =>
                `${item.id} (${(item as any).percentage.toFixed(0)}%)`,
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 3,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
            },
            {
              innerRadius: middleRadius,
              outerRadius: outerRadius - 30,
              data: middleData,
              arcLabel: (item) =>
                `${item.label} (${(item as any).percentage.toFixed(0)}%)`,
              arcLabelRadius: outerRadius - 45,
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 3,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
            },
            {
              innerRadius: outerRadius - 30,
              outerRadius: outerRadius,
              data: outerData,
              arcLabel: (item) => `${item.label}`,
              arcLabelRadius: outerRadius - 10,
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 3,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: isMobile ? '9px' : '11px',
            },
          }}
          hideLegend
        >
          <PieCenterLabel>{centerLabel}</PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}
