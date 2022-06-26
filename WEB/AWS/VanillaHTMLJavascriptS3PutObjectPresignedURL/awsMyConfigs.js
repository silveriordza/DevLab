/*
Please update your aws accessKey, secretKey, bucket name and awsRegion below.
Remembrer to remove the values again before doing a git add, commit or push into remote repository.
If you commited a mistake and did a git add with real aws keys, you can use git reset, to rollback the git add.
If you already did a commit with aws keys in there, you can revert the commit with git revert HEAD.
If you already pushed your commit to remote repository, that's more difficult to remove but it can also be done if executed with caution, and cannot be done
if others already did push to the same remote repo without losing their changes.
*/
export const awsMyConfigs = {
  S3: {
    awsAccesskey: 'CHANGE THIS TO YOUR AWS ACCESS ID KEY',
    awsSecretKey: 'CHANGE YOUR AWS SECRET KEY',
    awsBucketName: 'CHANGE THIS TO YOUR AWS BUCKET NAME',
  },
  Globals: {
    awsRegion: 'CHANGE THIS TO YOUR AWS REGION WHERE THE BUCKET IS LOCATED',
  },
}
