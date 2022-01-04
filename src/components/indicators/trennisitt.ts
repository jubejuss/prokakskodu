interface NewIndicator {
  month: Date;
  gasUsage: number;
  waterUsage: number;
}

interface Indicator extends NewIndicator {
  id: number;
}

interface UpdateIndicator {
  id: number;
  month: Date;
  gasUsage: number;
  waterUsage: number;
}

export { Indicator, UpdateIndicator, NewIndicator };
