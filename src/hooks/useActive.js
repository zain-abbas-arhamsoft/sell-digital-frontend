import { useState } from 'react';

const useActive = (initState) => {
    console.log('initState...',initState)
    const [active, setActive] = useState(initState);
    const handleActive = (i) => {
        console.log('i',i)
        setActive(i);
    };

    const activeClass = (i) => {
        console.log('activeClass',i)
        return active === i ? 'active' : '';
    };

    return { active, handleActive, activeClass };
};

export default useActive;