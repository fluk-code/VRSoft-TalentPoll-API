module.exports = {
  extends: ['jira'],
  plugins: ['commitlint-plugin-jira-rules'],
  rules: {
    'jira-task-id-project-key': [2, 'always', ['TASK']],
    'jira-task-id-separator': [2, 'always', '-'],
  },
};
