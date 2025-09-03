import { motion } from 'framer-motion';

import { Grid, Flex, Text } from '@mantine/core';

import BranchComponent from '../components/branch';

const BranchPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Grid>
                <Grid.Col span={{ base: 12 }}>
                    <Flex justify="center" align="center">
                        <Text fw={500}>Nhánh</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={{ base: 12 }} style={{ padding: 0 }}>
                    <hr />{' '}
                </Grid.Col>
            </Grid>
            <BranchComponent />
        </motion.div>
    );
};

export default BranchPage;
