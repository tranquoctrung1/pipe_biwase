import { motion } from 'framer-motion';
import { Tabs } from '@mantine/core';

import QuantityDailyNTSX from '../components/quantityDailyNTSX';
import QuantityMonthlyNTSX from '../components/quantityMonthlyNTSX';

const QuantityNTSXPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Tabs defaultValue="month">
                <Tabs.List>
                    <Tabs.Tab value="month">Sản lượng năm</Tabs.Tab>
                    <Tabs.Tab value="day">Sản lượng tháng</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="month">
                    <QuantityMonthlyNTSX></QuantityMonthlyNTSX>
                </Tabs.Panel>

                <Tabs.Panel value="day">
                    <QuantityDailyNTSX></QuantityDailyNTSX>
                </Tabs.Panel>
            </Tabs>
        </motion.div>
    );
};

export default QuantityNTSXPage;
