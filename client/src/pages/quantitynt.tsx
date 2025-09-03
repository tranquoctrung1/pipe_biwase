import { motion } from 'framer-motion';
import { Tabs } from '@mantine/core';

import QuantityDaylyNT from '../components/quantityDailyNT';
import QuantityMonthlyNT from '../components/quantityMonthlyNT';
import QuantityYearlyNT from '../components/quantityYearlyNT';

const QuantityNTPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Tabs defaultValue="month">
                <Tabs.List>
                    <Tabs.Tab value="year">Sản lượng các năm</Tabs.Tab>
                    <Tabs.Tab value="month">Sản lượng năm</Tabs.Tab>
                    <Tabs.Tab value="day">Sản lượng tháng</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="year">
                    <QuantityYearlyNT></QuantityYearlyNT>
                </Tabs.Panel>

                <Tabs.Panel value="month">
                    <QuantityMonthlyNT></QuantityMonthlyNT>
                </Tabs.Panel>

                <Tabs.Panel value="day">
                    <QuantityDaylyNT></QuantityDaylyNT>
                </Tabs.Panel>
            </Tabs>
        </motion.div>
    );
};

export default QuantityNTPage;
