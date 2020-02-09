var execFileSync = require('child_process').execFileSync;

function exec() {
  console.log(arguments);
  execFileSync.apply(null, arguments);
}

exec('curl', ['-o', 'sshst.deb', '-L', 'https://github.com/aidansteele/sshstdemo/releases/download/1/sshst_v0.1.14-next_linux_amd64.deb']);
exec('sudo', ['dpkg', '-i', 'sshst.deb']);

var args = ['listen', '--repo', process.env.INPUT_REPO, '-c', '/bin/bash'];

var webOk = process.env.INPUT_WEBOK != 'false';
if (webOk) {
  args.push('--web-ok')
}

var notify = "" + process.env.INPUT_NOTIFY;
if (notify.length > 0) {
  args.push('--notify', notify);
}

var allowedJoined = "" + process.env.INPUT_ALLOWEDUSERS;
var allowed = allowedJoined.split(/[ ,]+/).filter(Boolean); // removes empties
for (var user in allowed) {
  args.push('-g', user);
}

exec('sshst', args);
