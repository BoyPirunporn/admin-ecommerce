import React from 'react';
import { delay } from '@/lib/utils';
import DashboardClient from './components/DashboardClient';

type Props = {};

const DashBoardPage = async (props: Props) => {
  await delay(2000)
  return (
    <DashboardClient />
  );
};

export default DashBoardPage;;