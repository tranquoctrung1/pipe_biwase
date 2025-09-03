import Control from 'react-leaflet-custom-control';
import { Flex, Text, Progress, Transition } from '@mantine/core';

const LegendMap = ({ openLegend }: any) => {
    return (
        <Control position="bottomright">
            <Transition
                mounted={openLegend}
                transition="fade"
                duration={200}
                timingFunction="ease"
            >
                {() => (
                    <div
                        style={{
                            padding: '10px',
                            backgroundColor: '#f5deb3c7',
                            borderRadius: '5px',
                        }}
                    >
                        <Flex gap="md" justify="start" align="center">
                            <Text size="sm" c="red" fw={600}>
                                Áp lực (m)
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Text size="sm" c="blue" fw={600}>
                                Lưu lượng (m3/h)
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Text size="sm" c="green" fw={600}>
                                Kênh khác
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#c23616"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                70 {'<'} Áp lực {'<='} 80
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#e84118"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                60 {'<'} Áp lực {'<='} 70
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#ffbe76"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                50 {'<'} Áp lực {'<= '} 60
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#4834d4"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                40 {'<'} Áp lực {'<= '} 50
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#686de0"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                30 {'<'} Áp lực {'<= '} 40
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#4cd137"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                20 {'<'} Áp lực {'<= '} 30
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#44bd32"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                10 {'<'} Áp lực {'<= '} 20
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#fbc531"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                0 {'<'} Áp lực {'<= '} 10
                            </Text>
                        </Flex>
                        <Flex gap="md" justify="start" align="center">
                            <Progress
                                size="sm"
                                value={100}
                                color="#c56cf0"
                                style={{ width: '20px' }}
                            />
                            <Text size="sm" c="#dff9fb">
                                Áp lực {'<= '} 0
                            </Text>
                        </Flex>
                    </div>
                )}
            </Transition>
        </Control>
    );
};

export default LegendMap;
