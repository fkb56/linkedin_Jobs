const { src, dest } = require('gulp');
const path = require('path');

function buildIcons() {
  // Copie linkedin.svg dans le bon dossier de dist
  return src('nodes/linkedin.svg')
    .pipe(dest('dist/nodes/LinkedInJobs/'));
}

exports['build:icons'] = buildIcons;