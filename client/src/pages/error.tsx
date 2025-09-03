import { Button, Center, Image, Text, Flex } from '@mantine/core';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Error404 from '../assets/404.jpg';

const ErrorPage = () => {
    const navigate = useNavigate();

    const onReturnOnClicked = () => {
        navigate(-1);
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Flex
                justify="center"
                align="center"
                style={{
                    width: '70%',
                    height: '90vh',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingTop: '10px',
                }}
            >
                <Image
                    radius="md"
                    src={Error404}
                    alt="Random unsplash image"
                    h="98%"
                />
            </Flex>
            <Flex justify="center" align="center">
                <Text size="md" fw={500}>
                    Error 404! Not Found
                </Text>
            </Flex>

            <Center>
                <Button
                    variant="filled"
                    color="blue"
                    onClick={onReturnOnClicked}
                >
                    Quay lại
                </Button>
            </Center>
        </motion.div>
    );
};

export default ErrorPage;
