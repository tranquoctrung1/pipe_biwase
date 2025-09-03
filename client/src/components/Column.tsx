import { Text, Flex } from '@mantine/core';
import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Item from './Item';

import { styled } from '../stiches.config';

interface ColumnProps {
    list: [];
    id: string;
    title: string;
}

const StyledColumn = styled('div', {
    width: '90%',
    padding: '10px',
    margin: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,.2)',
    borderRadius: '10px',
    border: '1px solid whitesmoke',
    overflowY: 'scroll',
});

const StyledList = styled('div', {
    minHeight: '100vh',
});

const Column: React.FC<ColumnProps> = ({ list, id, title }) => {
    return (
        <Droppable droppableId={id}>
            {
                //@ts-ignore
                (provided) => (
                    <StyledColumn>
                        <Flex justify="center" align="center">
                            <Text fw={500}>{title}</Text>
                        </Flex>
                        <div style={{ width: '100%', marginBottom: '20px' }}>
                            <hr />
                        </div>
                        <StyledList
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {list.map((el, index) => (
                                <Item
                                    //@ts-ignore
                                    key={el._id}
                                    //@ts-ignore
                                    text={el.SiteId}
                                    index={index}
                                />
                            ))}

                            {provided.placeholder}
                        </StyledList>
                    </StyledColumn>
                )
            }
        </Droppable>
    );
};

export default Column;
