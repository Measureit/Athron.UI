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
                    <Link to="/blog">{t('blog')}</Link>
                </li>
                <li>
                    <Link to="/simulator">{t('simulator')}</Link>
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