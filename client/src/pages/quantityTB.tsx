import { motion } from 'framer-motion';
import { Tabs } from '@mantine/core';

import QuantityDailyTB from '../components/quantityDailyTB';
import QuantityMonthlyTB from '../components/quantityMonthlyTB';
import QuantityYearlyTB from '../components/quantityYearlyTB';

const QuantityTBPage = () => {
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
                    <QuantityYearlyTB></QuantityYearlyTB>
                </Tabs.Panel>

                <Tabs.Panel value="month">
                    <QuantityMonthlyTB></QuantityMonthlyTB>
                </Tabs.Panel>

                <Tabs.Panel value="day">
                    <QuantityDailyTB></QuantityDailyTB>
                </Tabs.Panel>
            </Tabs>
        </motion.div>
    );
};

export default QuantityTBPage;
