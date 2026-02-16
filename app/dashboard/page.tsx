'use client';

import React, {useState} from 'react';
import Header from '@/app/components/Header'
import PanelMenu from '@/app/components/PanelMenu'
import Footer from '@/app/components/Footer'
import ActiveComponent from '@/app/components/Content'

export default function DashboardPage() {
    const [activeComponent, setActiveComponent] = useState<'A' | 'B' | 'C'>('A');

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex flex-1">
                <PanelMenu activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>
                <ActiveComponent activeComponent={activeComponent}/>
            </div>
            <Footer/>
        </div>
    );
}
