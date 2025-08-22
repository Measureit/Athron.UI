import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupSession, selectGroupSessions } from '../redux/groupSlice';
import { RootState } from '../redux/store';

const GroupSession: React.FC = () => {
    const dispatch = useDispatch();
    const groupSessions = useSelector((state: RootState) => selectGroupSessions(state));
    const [sessionName, setSessionName] = useState('');
    const [athleteIds, setAthleteIds] = useState<string>('');

    const handleCreateSession = () => {
        if (sessionName && athleteIds) {
            const athletes = athleteIds.split(',').map(id => id.trim());
            const newSession = {
                id: Date.now().toString(), // Simple ID generation
                name: sessionName,
                athletes
            };
            dispatch(createGroupSession(newSession));
            setSessionName('');
            setAthleteIds('');
        }
    };

    return (
        <div className="container-fluid p-4">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="fw-bold text-primary">
                        <i className="bi bi-people me-3"></i>
                        Group Training Sessions
                    </h1>
                    <p className="text-muted">Manage and schedule group training sessions for multiple athletes.</p>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-plus-circle me-2"></i>
                                Create New Session
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="sessionName" className="form-label">Session Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sessionName"
                                    placeholder="Enter session name"
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="athleteIds" className="form-label">Athlete IDs</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="athleteIds"
                                    placeholder="Enter athlete IDs separated by commas"
                                    value={athleteIds}
                                    onChange={(e) => setAthleteIds(e.target.value)}
                                />
                                <div className="form-text">Separate multiple athlete IDs with commas (e.g., 001, 002, 003)</div>
                            </div>
                            <button 
                                className="btn btn-primary"
                                onClick={handleCreateSession}
                                disabled={!sessionName || !athleteIds}
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                Create Session
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-calendar-event me-2"></i>
                                Today's Schedule
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="list-group list-group-flush">
                                <div className="list-group-item border-0 px-0">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 className="fw-bold mb-1">Morning Cardio</h6>
                                            <p className="text-muted mb-1">10:00 AM - 11:00 AM</p>
                                            <small className="text-success">5 athletes enrolled</small>
                                        </div>
                                        <span className="badge bg-success">Active</span>
                                    </div>
                                </div>
                                <div className="list-group-item border-0 px-0">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 className="fw-bold mb-1">Strength Training</h6>
                                            <p className="text-muted mb-1">2:00 PM - 3:30 PM</p>
                                            <small className="text-info">8 athletes enrolled</small>
                                        </div>
                                        <span className="badge bg-warning">Upcoming</span>
                                    </div>
                                </div>
                                <div className="list-group-item border-0 px-0">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 className="fw-bold mb-1">Recovery Session</h6>
                                            <p className="text-muted mb-1">4:00 PM - 5:00 PM</p>
                                            <small className="text-secondary">3 athletes enrolled</small>
                                        </div>
                                        <span className="badge bg-secondary">Scheduled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-transparent">
                            <h5 className="fw-bold mb-0">
                                <i className="bi bi-list-ul me-2"></i>
                                Existing Sessions
                            </h5>
                        </div>
                        <div className="card-body">
                            {groupSessions.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Session Name</th>
                                                <th>Athletes</th>
                                                <th>Count</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupSessions.map((session) => (
                                                <tr key={session.id}>
                                                    <td className="fw-bold">{session.name}</td>
                                                    <td>
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {session.athletes.slice(0, 3).map((athlete, index) => (
                                                                <span key={index} className="badge bg-light text-dark">
                                                                    {athlete}
                                                                </span>
                                                            ))}
                                                            {session.athletes.length > 3 && (
                                                                <span className="badge bg-secondary">
                                                                    +{session.athletes.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-info">
                                                            {session.athletes.length} athletes
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-2">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-calendar-x text-muted" style={{ fontSize: '3rem' }}></i>
                                    <h5 className="text-muted mt-3">No sessions created yet</h5>
                                    <p className="text-muted">Create your first group training session using the form above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupSession;