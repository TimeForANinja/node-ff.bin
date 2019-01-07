# node-ffmpeg.bin
A platform independent installer of [FFmpeg](https://ffmpeg.org/).
Based on [node-ffmpeg-binaries](https://github.com/Hackzzila/node-ffmpeg-binaries).

Supported architectures:

| &#8203; | Linux<br>(ffmpeg and ffprobe) | Windows<br>(ffmpeg, ffprobe & ffplay) | Mac<br>(ffmpeg, ffprobe & ffplay) |
| ---   | ------- | --- | --- |
| x64   | ✓ | ✓ | ✓ |
| ia32  | ✓ | ✓ | &#8203; |
| arm   | ✓ | &#8203; |&#8203; |
| arm64 | ✓ | &#8203;| &#8203; |

## API
`node-ffmpeg-binaries` exports a string containing the path to the FFmpeg executable.

This software uses code of <a href=http://ffmpeg.org>FFmpeg</a> licensed under the <a href=http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html>LGPLv2.1</a> and its source can be downloaded [here](ffmpeg).
