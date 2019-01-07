const { join } = require('path');

module.exports = {
  ffmpeg: join(__dirname, 'bin', `ffmpeg${process.platform === 'win32' ? '.exe' : ''}`),
  ffprobe: join(__dirname, 'bin', `ffprobe${process.platform === 'win32' ? '.exe' : ''}`),
  ffplay: process.platform === 'linux' ? null : join(__dirname, 'bin', `ffplay${process.platform === 'win32' ? '.exe' : ''}`),
};
