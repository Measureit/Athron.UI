import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">{t('dashboard')}</Link>
                </li>
                <li>
                    <Link to="/athlete">{t('athlete')}</Link>
                </li>
                <li>
                    <Link to="/group">{t('group')}</Link>
                </li>
                <li>
                    <Link to="/simulation">{t('simulation')}</Link>
                </li>
                <li>
                    <Link to="/analytics">{t('analytics')}</Link>
                </li>
                <li>
                    <Link to="/settings">{t('settings')}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;