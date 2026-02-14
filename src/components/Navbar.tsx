import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEMO_MODE } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useDemoAuth } from '../contexts/DemoAuthContext';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const authHook = DEMO_MODE ? useDemoAuth() : useAuth();
    const userEmail = (authHook as any)?.user?.email || '';
    const isCoach = userEmail === process.env.REACT_APP_COACH_EMAIL;

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">{t('dashboard') || 'Dashboard'}</Link>
                </li>
                <li>
                    <Link to="/skills-library">{t('skillsLibrary') || 'Skills Library'}</Link>
                </li>
                <li>
                    <Link to="/exercise-library">{t('exerciseLibrary') || 'Exercise Library'}</Link>
                </li>
                <li>
                    <Link to="/blog">{t('blog') || 'Blog'}</Link>
                </li>
                {isCoach && (
                  <>
                    <li>
                        <Link to="/simulator">{t('simulator') || 'Simulator'}</Link>
                    </li>
                    <li>
                        <Link to="/analytics">{t('analytics') || 'Analytics'}</Link>
                    </li>
                    <li>
                        <Link to="/builder">{t('builder') || 'Builder'}</Link>
                    </li>
                    <li>
                        <Link to="/settings">{t('settings') || 'Settings'}</Link>
                    </li>
                  </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;