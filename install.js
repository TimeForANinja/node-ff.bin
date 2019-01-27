const { createWriteStream, mkdirSync, existsSync } = require('fs');
const { cursorTo } = require('readline');
const { get } = require('https');
const unzip = require('unzip');
const path = require('path');
const tar = require('tar');
const lzma = require('lzma-native');

function callback(res) {
  let last;
  let complete = 0;
  const total = parseInt(res.headers['content-length'], 10);

  res.on('data', (chunk) => {
    complete += chunk.length;
    const progress = Math.round((complete / total) * 20);

    if (progress !== last) {
      cursorTo(process.stdout, 0, null);

      process.stdout.write(`Downloading binary: [${'='.repeat(progress)}${[' '.repeat(20 - progress)]}] ${Math.round((complete / total) * 100)}%`);

      last = progress;
    }
  });

  res.on('end', () => {
    cursorTo(process.stdout, 0, null);
    process.stdout.write(`Downloading binary: [${'='.repeat(20)}] 100%\n`);
  });

  const targetDir = path.resolve(__dirname, 'bin/');
  if (!existsSync(targetDir)) mkdirSync(targetDir);

  if (process.platform === 'linux') {
    // tarxz
    res.pipe(new lzma.Decompressor()).pipe(tar.extract({
      cwd: targetDir,
      strip: 1,
      filter: filePath => ['ffmpeg', 'ffprobe'].includes(path.basename(filePath)),
    }));
  } else {
    // unzip
    res.pipe(unzip.Parse()).on('entry', (entry) => {
      const bName = path.basename(entry.path);
      const fName = bName.substr(0, bName.length - path.extname(entry.path).length);
      if (!['ffmpeg', 'ffprobe', 'ffplay'].includes(fName)) return entry.autodrain();
      if (!['.exe', ''].includes(path.extname(entry.path))) return entry.autodrain();
      return entry.pipe(createWriteStream(path.resolve(targetDir, bName)));
    });
  }
}

if (process.platform === 'win32') {
  switch (process.arch) {
    case 'x64':
      get('https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-latest-win64-static.zip', callback);
      break;
    case 'ia32':
      get('https://ffmpeg.zeranoe.com/builds/win32/static/ffmpeg-latest-win32-static.zip', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else if (process.platform === 'linux') {
  switch (process.arch) {
    case 'x64':
      get('https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz', callback);
      break;
    case 'ia32':
      get('https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-32bit-static.tar.xz', callback);
      break;
    case 'arm':
      get('https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-armhf-static.tar.xz', callback);
      break;
    case 'arm64':
      get('https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-arm64-static.tar.xz', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else if (process.platform === 'darwin') {
  switch (process.arch) {
    case 'x64':
      get('https://ffmpeg.zeranoe.com/builds/macos64/static/ffmpeg-latest-macos64-static.zip', callback);
      break;
    default:
      throw new Error('unsupported platform');
  }
} else {
  throw new Error('unsupported platform');
}
