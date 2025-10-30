import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';

import { AdvancedPieProps } from '../interfaces/advancedPieProps';

const StyledText = styled('text')(({ theme }: { theme: Theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontWeight: 600,
}));

function PieCenterLabel({ children }: { readonly children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
export default function GenericPie(props: Readonly<AdvancedPieProps>) {
  const { mainData, middleData, outerData, title, centerLabel } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  let innerRadius = 60;
  let middleRadius = 130;
  let outerRadius = 200;
  if (isMobile) {
    innerRadius = 30;
    middleRadius = 70;
    outerRadius = 110;
  } else if (isTablet) {
    innerRadius = 50;
    middleRadius = 100;
    outerRadius = 150;
  }

  const minPercentageToShow = 7;
  const getPercentage = (id: string, arr: { id: string; percentage: number }[]) => {
    const found = arr.find((d) => d.id === id);
    return found ? found.percentage : 0;
  };

  let chartHeight = 500;
  if (isMobile) chartHeight = 320;
  else if (isTablet) chartHeight = 420;

  const diameter = outerRadius * 2;
  let paddingExtra = 60;
  if (isMobile) paddingExtra = 40;
  else if (isTablet) paddingExtra = 50;
  const containerWidth = diameter + paddingExtra;

  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        px: 0,
        py: { xs: 1, sm: 2 },
      }}
    >
      {title && (
        <Typography
          variant={'h6'}
          gutterBottom
          sx={{ fontWeight: 600, color: '#fff', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          height: chartHeight,
          width: `${containerWidth}px`,
        }}
      >
        <PieChart
          series={[
            {
              innerRadius,
              outerRadius: middleRadius,
              data: mainData.map((d) => ({ ...d })),
              arcLabel: (item) => {
                const pct = getPercentage(String(item.id), mainData);
                return pct >= minPercentageToShow ? `${item.id} (${pct.toFixed(0)}%)` : '';
              },
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 5,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
              paddingAngle: 0,
              startAngle: 0,
              endAngle: 360,
            },
            {
              innerRadius: middleRadius,
              outerRadius: outerRadius - 30,
              data: middleData.map((d) => ({ ...d })),
              arcLabel: (item) => {
                const pct = getPercentage(String(item.id), middleData);
                return pct >= minPercentageToShow ? `${item.label} (${pct.toFixed(0)}%)` : '';
              },
              arcLabelRadius: outerRadius - 45,
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 5,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
              paddingAngle: 0,
              startAngle: 0,
              endAngle: 360,
            },
            {
              innerRadius: outerRadius - 30,
              outerRadius: outerRadius,
              data: outerData.map((d) => ({ ...d })),
              arcLabel: () => '',
              arcLabelRadius: outerRadius - 10,
              valueFormatter: ({ value }) => `${value}`,
              cornerRadius: 5,
              highlightScope: { fade: 'global', highlight: 'item' },
              highlighted: { additionalRadius: 2 },
              paddingAngle: 0,
              startAngle: 0,
              endAngle: 360,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontSize: isMobile ? '9px' : '11px',
              fill: '#fff',
              textShadow: '0 1px 4px #000',
            },
            '& .MuiPieArc-root': {
              stroke: '#2c2c2c',
              strokeWidth: 3,
            },
          }}
          hideLegend
        >
          <PieCenterLabel>
            <tspan style={{ fontSize: isMobile ? '18px' : '24px', fill: '#fff' }}>{centerLabel}</tspan>
          </PieCenterLabel>
        </PieChart>
      </Box>
    </Box>
  );
}
