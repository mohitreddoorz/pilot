// hotel-dashboard/src/components/IssueItem.js

import React from 'react';
import './IssueItem.css';

const IssueItem = ({ issue, onResolve }) => {
    const handleResolveClick = () => {
        const isConfirmed = window.confirm(
            `Are you sure you want to mark the issue in Room ${issue.room} as resolved?`
        );
        if (isConfirmed) {
            onResolve(issue._id);
        }
    };

    // The check for images is no longer needed right now, but we can leave it
    // const hasImage = issue.images && issue.images.length > 0;

    return (
        <div className={`issue-item-card status-${issue.status.toLowerCase()}`}>
            <div className="card-header">
                <h3>Room: {issue.room}</h3>
                <span className={`status-badge status-badge-${issue.status.toLowerCase()}`}>
                    {issue.status.replace('_', ' ')}
                </span>
            </div>
            <div className="card-body">
                <p className="issue-description">{issue.Description}</p>

                {/*
                // THIS PART IS NOW COMMENTED OUT
                // We will not render the image container for now.
                
                {hasImage && (
                    <div className="media-container">
                        <img src={issue.images[0].dataURI} alt="Guest submission" className="issue-image"/>
                    </div>
                )}
                */}
                
                <div className="issue-details">
                    <p><strong>Category:</strong> {issue.category}</p>
                    <p><strong>Reported At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="card-footer">
                {issue.status !== 'RESOLVED' && (
                    <button onClick={handleResolveClick} className="resolve-btn">
                        Mark as Resolved
                    </button>
                )}
            </div>
        </div>
    );
};

export default IssueItem;