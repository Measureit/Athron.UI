import React from 'react';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold text-primary">
            <i className="bi bi-gear me-3"></i>
            Settings
          </h1>
          <p className="text-muted">Configure your training app preferences and settings.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">General Settings</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">App Language</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={i18n.language}
                    onChange={e => i18n.changeLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="pl">Polski</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Time Zone</label>
                <div className="col-sm-9">
                  <select className="form-select">
                    <option selected>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Date Format</label>
                <div className="col-sm-9">
                  <select className="form-select">
                    <option selected>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">Notification Settings</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="sessionReminders" checked />
                <label className="form-check-label" htmlFor="sessionReminders">
                  Session Reminders
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="performanceAlerts" checked />
                <label className="form-check-label" htmlFor="performanceAlerts">
                  Performance Alerts
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="goalAchievements" />
                <label className="form-check-label" htmlFor="goalAchievements">
                  Goal Achievement Notifications
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="weeklyReports" checked />
                <label className="form-check-label" htmlFor="weeklyReports">
                  Weekly Reports
                </label>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">Data & Privacy</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="dataSharing" />
                <label className="form-check-label" htmlFor="dataSharing">
                  Allow anonymous data sharing for research
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input className="form-check-input" type="checkbox" id="autoBackup" checked />
                <label className="form-check-label" htmlFor="autoBackup">
                  Automatic data backup
                </label>
              </div>
              <div className="mt-4">
                <button className="btn btn-outline-danger me-2">Export Data</button>
                <button className="btn btn-outline-warning">Delete Account</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-download me-2"></i>
                  Backup Data
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Sync Settings
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-question-circle me-2"></i>
                  Help & Support
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-info-circle me-2"></i>
                  About App
                </button>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">App Information</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Version:</strong> 1.0.0
              </div>
              <div className="mb-2">
                <strong>Last Updated:</strong> Aug 14, 2025
              </div>
              <div className="mb-2">
                <strong>Storage Used:</strong> 45.2 MB
              </div>
              <div className="mb-2">
                <strong>Athletes:</strong> 24
              </div>
              <div className="mb-2">
                <strong>Sessions:</strong> 156
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col text-end">
          <button className="btn btn-secondary me-2">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
