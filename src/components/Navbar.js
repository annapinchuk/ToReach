import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../styles/NavbarStyles';

const Navbar = ({ isClient, isNavbarOpen, setIsNavbarOpen }) => {


    const clientPages = [
        'התורים שלי',
        'פרופיל',
        'חיפוש',
        'התנתקות',
    ];

    const businessPages = [
        'יומן',
        'פרופיל',
        'התנתקות',
    ];

    const renderPages = () => isClient ? clientPages.map(page => <Text key={page} style={styles.PageButton}>{page}</Text>)
        : businessPages.map(page => <Text key={page} style={styles.PageButton}>{page}</Text>)

    return (
        <View style={styles.header}>
            <Ionicons style={styles.icon} name="menu" onPress={() => { setIsNavbarOpen(!isNavbarOpen) }} size={32} />
            {isNavbarOpen &&
                <View style={styles.overlay}>
                    {renderPages()}
                </View>}
        </View>
    );
}

export default Navbar;

