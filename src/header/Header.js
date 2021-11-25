import { render } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';

export const Header = (props) =>
{
    const [headerMessage, setHeaderMessage] = useState(0);
    render()
    {
        return(
            <h1>Create your own meme</h1>
        );
    }
}
