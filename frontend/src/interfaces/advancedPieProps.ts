import { ChartDatum } from "./chartDatum";

export interface AdvancedPieProps {
  mainData: ChartDatum[];
  middleData: ChartDatum[];
  outerData: ChartDatum[];
  title?: string;
  centerLabel?: string;
}