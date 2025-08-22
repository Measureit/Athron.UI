import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold text-primary">
            <i className="bi bi-bar-chart me-3"></i>
            Analytics & Reports
          </h1>
          <p className="text-muted">Detailed performance analytics and training insights.</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-info mb-3">
                <i className="bi bi-graph-up" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="fw-bold">Performance Trends</h4>
              <p className="text-muted">Track athlete performance over time</p>
              <button className="btn btn-outline-info">View Trends</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-success mb-3">
                <i className="bi bi-pie-chart" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="fw-bold">Training Distribution</h4>
              <p className="text-muted">Breakdown of training types and intensity</p>
              <button className="btn btn-outline-success">View Distribution</button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="text-warning mb-3">
                <i className="bi bi-bullseye" style={{ fontSize: '3rem' }}></i>
              </div>
              <h4 className="fw-bold">Goal Progress</h4>
              <p className="text-muted">Monitor achievement of training goals</p>
              <button className="btn btn-outline-warning">View Goals</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">Performance Chart</h5>
            </div>
            <div className="card-body">
              <div className="bg-light rounded p-4 text-center" style={{ height: '300px' }}>
                <i className="bi bi-graph-up text-muted" style={{ fontSize: '4rem' }}></i>
                <p className="text-muted mt-3">D3.js Performance Chart will be rendered here</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h5 className="fw-bold mb-0">Top Performers</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex justify-content-between">
                    <span>John Doe</span>
                    <span className="badge bg-success">96%</span>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex justify-content-between">
                    <span>Jane Smith</span>
                    <span className="badge bg-success">94%</span>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex justify-content-between">
                    <span>Mike Johnson</span>
                    <span className="badge bg-warning">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
