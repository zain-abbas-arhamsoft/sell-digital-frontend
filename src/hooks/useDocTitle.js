import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - SellDigital`;
        } else {
            document.title = 'SellDigital | The Perf';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
