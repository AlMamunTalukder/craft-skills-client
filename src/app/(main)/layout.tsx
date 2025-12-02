import Footer from '@/src/components/shared/Footer';
import React, { ReactNode } from 'react';

const layout = ({children}:{children: ReactNode;}) => {
    return (
        <div>
           <main className="flex-grow">{children}</main>
           <Footer/>
        </div>
    );
};

export default layout;