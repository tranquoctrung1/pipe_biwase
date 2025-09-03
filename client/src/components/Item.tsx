import React from 'react';

//@ts-ignore
import { Draggable } from 'react-beautiful-dnd';

import { styled } from '../stiches.config';

interface ItemProps {
    index: number;
    text: string;
}

const StyledItem = styled('div', {
    backgroundColor: '#eee',
    borderRadius: 4,
    padding: '4px 8px',
    transition: 'background-color .8s ease-out',
    marginTop: 8,
    fontWeight: 500,

    ':hover': {
        backgroundColor: '#fff',
        transition: 'background-color .1s ease-in',
    },
});

//@ts-ignore
const Item: React.FC<ItemProps> = ({ index, text }) => {
    return (
        <Draggable draggableId={text} index={index}>
            {
                //@ts-ignore
                (provided) => (
                    <StyledItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {text}
                    </StyledItem>
                )
            }
        </Draggable>
    );
};

export default Item;
