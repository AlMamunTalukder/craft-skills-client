import React, { ReactNode } from 'react';

const layout = ({children}:{children: ReactNode;}) => {
    return (
        <div>
           <main className="flex-grow">{children}</main>
        </div>
    );
};

export default layout;