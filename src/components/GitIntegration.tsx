import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { cloneRepository, commitChanges, pushChanges } from '../services/apiService';

const GitIntegration: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('');

  const handleClone = async () => {
    try {
      await cloneRepository(repoUrl, branch);
      message.success('Repository cloned successfully');
    } catch (error) {
      message.error('Failed to clone repository');
    }
  };

  const handleCommit = async () => {
    try {
      await commitChanges('Commit message');
      message.success('Changes committed successfully');
    } catch (error) {
      message.error('Failed to commit changes');
    }
  };

  const handlePush = async () => {
    try {
      await pushChanges();
      message.success('Changes pushed successfully');
    } catch (error) {
      message.error('Failed to push changes');
    }
  };

  return (
    <div className="git-integration">
      <h3>Git Integration</h3>
      <Input
        placeholder="Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Input
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <Button onClick={handleClone}>Clone</Button>
      <Button onClick={handleCommit}>Commit</Button>
      <Button onClick={handlePush}>Push</Button>
    </div>
  );
};

export default GitIntegration;
