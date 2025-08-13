// hotel-dashboard/src/components/IssuesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import IssueItem from './IssueItem';

// The URL of our backend API
const API_URL = 'http://localhost:5000/api/tickets';

const IssuesList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                setLoading(true);
                const response = await axios.get(API_URL);
                setIssues(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch issues. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    const handleResolveIssue = (issueId) => {
        setIssues(prevIssues =>
            prevIssues.map(issue =>
                issue._id === issueId ? { ...issue, status: 'RESOLVED' } : issue
            )
        );
        // In a future step, you would make a PUT request to the backend here
        console.log(`Issue ${issueId} status updated on frontend.`);
    };

    if (loading) {
        return <p style={{ textAlign: 'center' }}>Loading issues...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
    }

    return (
        <div className="issues-list-container">
            {issues.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No open issues found.</p>
            ) : (
                issues.map(issue => (
                    <IssueItem key={issue._id} issue={issue} onResolve={handleResolveIssue} />
                ))
            )}
        </div>
    );
};

export default IssuesList;